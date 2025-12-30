// Dynamic collections loader (auto-discovers folders via GitHub Contents API)
// This enables "add a folder => project/course appears automatically" on GitHub Pages.

(function () {
  function slugify(input) {
    return String(input || '')
      .trim()
      .toLowerCase()
      .replace(/[\u2014\u2013]/g, '-') // em/en dash
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function inferRepoConfig() {
    // Allow manual override (recommended for localhost)
    const cfg = window.REPO_CONFIG || window.repoConfig || {};

    // Allow meta-tag override as well
    const metaOwner = document.querySelector('meta[name="github-owner"]')?.getAttribute('content') || '';
    const metaRepo = document.querySelector('meta[name="github-repo"]')?.getAttribute('content') || '';
    const metaBranch = document.querySelector('meta[name="github-branch"]')?.getAttribute('content') || '';

    const host = window.location.hostname || '';
    const pathname = window.location.pathname || '/';

    // If hosted on GitHub Pages:
    // - User page: https://<owner>.github.io/   repo = "<owner>.github.io"
    // - Project page: https://<owner>.github.io/<repo>/   repo = "<repo>"
    let owner = '';
    let repo = '';

    const isGitHubPagesHost = /\.github\.io$/i.test(host);
    if (isGitHubPagesHost) {
      owner = host.split('.')[0] || '';

      const seg = pathname.replace(/^\/+/, '').split('/')[0] || '';
      repo = seg || host; // seg present => project page, else user page
    }

    return {
      owner: cfg.owner || metaOwner || owner,
      repo: cfg.repo || metaRepo || repo,
      branch: cfg.branch || metaBranch || null, // probe main/master if null
    };
  }

  async function fetchJson(url) {
    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-cache',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.json();
  }

  async function listGitHubContents({ owner, repo, branch }, path) {
    const ref = branch ? `?ref=${encodeURIComponent(branch)}` : '';
    const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path}${ref}`;
    return await fetchJson(url);
  }

  async function detectBranch(cfg) {
    if (cfg.branch) return cfg.branch;

    // Try main then master
    const candidates = ['main', 'master'];
    for (const b of candidates) {
      try {
        await listGitHubContents({ ...cfg, branch: b }, 'projects');
        return b;
      } catch (_) {
        // ignore
      }
    }
    // Fall back (API will error later with useful message)
    return 'main';
  }

  function pickFirstImage(files) {
    const imageExt = /\.(png|jpe?g|webp|gif|svg)$/i;
    const images = files.filter(f => f && f.type === 'file' && imageExt.test(f.name || ''));
    images.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    const preferred = images.find(x => /^00-thumbnail\./i.test(String(x.name || '')));
    if (preferred) return preferred;
    return images[0] || null;
  }

  function findMetaFile(files, preferredName) {
    const lower = String(preferredName).toLowerCase();
    return files.find(f => f && f.type === 'file' && String(f.name || '').toLowerCase() === lower) || null;
  }

  async function loadCollection(kind, metaFileName) {
    // 1) Prefer local manifest (works on localhost + GitHub Pages without API)
    try {
      const idxRes = await fetch(`./${kind}/index.json`, { cache: 'no-cache' });
      if (idxRes.ok) {
        const idx = await idxRes.json();
        const folders = Array.isArray(idx.folders) ? idx.folders : [];
        const items = [];

        for (const folderName of folders) {
          try {
            const folderSeg = encodeURIComponent(folderName);
            const metaRes = await fetch(`./${kind}/${folderSeg}/${metaFileName}`, { cache: 'no-cache' });
            if (!metaRes.ok) continue;
            const meta = await metaRes.json();

            // Thumbnail strategy for static hosting:
            // Prefer 00-thumbnail.* if present; otherwise best-effort common extensions.
            const thumbCandidates = [
              '00-thumbnail.png',
              '00-thumbnail.jpg',
              '00-thumbnail.jpeg',
              '00-thumbnail.webp',
              '00-thumbnail.gif',
              '00-thumbnail.svg',
            ];
            let imageUrl = null;
            for (const f of thumbCandidates) {
              const url = `./${kind}/${folderSeg}/${encodeURIComponent(f)}`;
              const head = await fetch(url, { method: 'HEAD' });
              if (head.ok) {
                imageUrl = url;
                break;
              }
            }

            const title = meta.title || folderName;
            const id = meta.id || slugify(folderName) || slugify(title);
            items.push({
              id,
              title,
              meta: meta.meta || '',
              image: imageUrl,
              details: meta.details || null,
              folderName,
              basePath: `./${kind}/${folderSeg}/`,
              ...meta,
            });
          } catch (e) {
            console.warn(`[dynamic-content] Failed loading ${kind}/${folderName} from local manifest:`, e);
          }
        }

        items.sort((a, b) => String(a.title).localeCompare(String(b.title)));
        return items;
      }
    } catch (e) {
      // Ignore and fall back to GitHub API
    }

    // 2) Fallback: GitHub API (no manifest needed after you push folders)
    const cfg = inferRepoConfig();
    if (!cfg.owner || !cfg.repo) {
      console.warn(
        `[dynamic-content] Missing repo config and no local ${kind}/index.json found. Set window.REPO_CONFIG = { owner, repo } (or meta tags github-owner/github-repo).`
      );
      return [];
    }
    cfg.branch = await detectBranch(cfg);

    let dirs = [];
    try {
      const root = await listGitHubContents(cfg, kind);
      dirs = Array.isArray(root) ? root.filter(x => x && x.type === 'dir') : [];
    } catch (e) {
      console.warn(`[dynamic-content] Could not list /${kind}/ via GitHub API:`, e);
      return [];
    }

    const items = [];

    for (const dir of dirs) {
      try {
        const files = await fetchJson(dir.url);
        const metaFile = findMetaFile(files, metaFileName);
        const thumbFile = pickFirstImage(files);

        let meta = {};
        if (metaFile && metaFile.download_url) {
          const metaRes = await fetch(metaFile.download_url, { cache: 'no-cache' });
          if (metaRes.ok) meta = await metaRes.json();
        }

        const title = meta.title || dir.name;
        const id = meta.id || slugify(dir.name) || slugify(title);

        items.push({
          id,
          title,
          meta: meta.meta || '',
          image: (thumbFile && thumbFile.download_url) ? thumbFile.download_url : null,
          details: meta.details || null,
          folderName: dir.name,
          basePath: `./${kind}/${encodeURIComponent(dir.name)}/`,
          ...meta,
        });
      } catch (e) {
        console.warn(`[dynamic-content] Failed loading ${kind}/${dir.name}:`, e);
      }
    }

    items.sort((a, b) => String(a.title).localeCompare(String(b.title)));
    return items;
  }

  window.loadDynamicCollections = async function loadDynamicCollections() {
    // Ensure siteData exists
    window.siteData = window.siteData || {};

    const [projects, courses] = await Promise.all([
      loadCollection('projects', 'project.json'),
      loadCollection('courses', 'course.json'),
    ]);

    window.siteData.projects = projects;
    window.siteData.courses = courses;
    return window.siteData;
  };
})();


