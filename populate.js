// Populate layer (Salma-style model)
// Renders UI from window.siteData and handles language + detail pages.

// Template/runtime globals (kept out of content.js)
window.translations = (window.siteData && window.siteData.translations) || {};

window.currentLanguage = 'en';
window.currentDetailPage = {
  type: null, // 'project' or 'course'
  id: null
};

window.initializeSite = function initializeSite() {
  if (!window.siteData) return;

  // Set avatar
  const brandImg = document.getElementById('brandImg');
  if (brandImg) brandImg.src = window.siteData.general.avatar;

  // Update social links
  window.updateSocialLinks();

  // Render skills/projects/courses
  window.renderSkills();
  window.renderProjects();
  window.renderCourses();
  window.renderResumeSections();

  // Apply language
  window.updateLanguage();
};

window.renderResumeSections = function renderResumeSections() {
  const resume = window.siteData && window.siteData.resume;
  if (!resume) return;

  const url = resume.pdfUrl || 'assets/Resume.pdf';
  const dl = document.getElementById('resumeDownloadBtn');
  if (dl) dl.setAttribute('href', url);

  const eduWrap = document.getElementById('educationList');
  if (eduWrap) {
    eduWrap.innerHTML = '';
    (resume.education || []).forEach(item => {
      const el = document.createElement('div');
      el.className = 'resume-item';
      el.innerHTML = `
        <div class="resume-item-head">
          <div class="resume-item-title">${item.degree || ''}</div>
          <div class="resume-item-date">${item.date || ''}</div>
        </div>
        <div class="resume-item-sub">${item.school || ''}${item.location ? ` • ${item.location}` : ''}</div>
      `;
      eduWrap.appendChild(el);
    });
  }

  const expWrap = document.getElementById('experienceList');
  if (expWrap) {
    expWrap.innerHTML = '';
    (resume.experience || []).forEach(item => {
      const el = document.createElement('div');
      el.className = 'resume-item';
      el.innerHTML = `
        <div class="resume-item-head">
          <div class="resume-item-title">${item.company || ''}${item.location ? ` • ${item.location}` : ''}</div>
          <div class="resume-item-date">${item.date || ''}</div>
        </div>
        ${item.summary ? `<div class="resume-item-sub">${item.summary}</div>` : ''}
      `;
      expWrap.appendChild(el);
    });
  }
};

// Inline SVGs so social icons work without Font Awesome CDN (blocked/slow in some regions).
window.socialLinkIcons = {
  email:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  github:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/></svg>',
  linkedin:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  telegram:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  youtube:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  instagram:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 7.022 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-7.02.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
};

window.updateSocialLinks = function updateSocialLinks() {
  const social = window.siteData && window.siteData.social;
  if (!social) return;

  const icons = window.socialLinkIcons || {};
  const cta = document.querySelector('.hero .cta');
  const contact = document.querySelector('#contact .contact');

  const render = (container) => {
    if (!container) return;
    container.innerHTML = '';
    if (social.email) {
      container.innerHTML += `<a class="btn primary icon-only" href="${social.email}" title="Email me">${icons.email || ''}</a>`;
    }
    if (social.github) {
      container.innerHTML += `<a class="btn ghost icon-only" target="_blank" rel="noopener" href="${social.github}" title="GitHub">${icons.github || ''}</a>`;
    }
    if (social.linkedin) {
      container.innerHTML += `<a class="btn ghost icon-only" target="_blank" rel="noopener" href="${social.linkedin}" title="LinkedIn">${icons.linkedin || ''}</a>`;
    }
    if (social.telegram) {
      container.innerHTML += `<a class="btn ghost icon-only" target="_blank" rel="noopener" href="${social.telegram}" title="Telegram">${icons.telegram || ''}</a>`;
    }
    if (social.youtube) {
      container.innerHTML += `<a class="btn ghost icon-only" target="_blank" rel="noopener" href="${social.youtube}" title="YouTube">${icons.youtube || ''}</a>`;
    }
    if (social.instagram) {
      container.innerHTML += `<a class="btn ghost icon-only" target="_blank" rel="noopener" href="${social.instagram}" title="Instagram">${icons.instagram || ''}</a>`;
    }
  };

  render(cta);
  render(contact);
};

window.renderSkills = function renderSkills() {
  if (!window.siteData || !window.siteData.skills) return;

  const skillsContainer = document.querySelector('#skills .skills-bars');
  if (!skillsContainer) return;

  skillsContainer.innerHTML = '';

  window.siteData.skills.forEach(group => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'skill-group';

    const h3 = document.createElement('h3');
    h3.id = `${group.id}Group`;
    h3.textContent = group.title;
    groupDiv.appendChild(h3);

    group.skills.forEach(skill => {
      const skillDiv = document.createElement('div');
      skillDiv.className = 'skill';
      skillDiv.innerHTML = `
        <div class="head">
          <span class="label">${skill.label}</span>
          <span class="val">${skill.percentage}%</span>
        </div>
        <div class="bar"><span style="--val:${skill.percentage}%;"></span></div>
      `;
      groupDiv.appendChild(skillDiv);
    });

    skillsContainer.appendChild(groupDiv);
  });

  // Initialize skill bars animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill .bar span');
        progressBars.forEach(bar => {
          const width = bar.style.getPropertyValue('--val');
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(skillsContainer);
};

window.renderProjects = function renderProjects() {
  if (!window.siteData || !Array.isArray(window.siteData.projects)) return;

  const projectsContainer = document.querySelector('#projects .grid');
  if (!projectsContainer) return;

  projectsContainer.innerHTML = '';

  window.siteData.projects.forEach((project, index) => {
    const article = document.createElement('article');
    article.className = 'card project media-card';
    const thumb = project.image
      ? `<div class="thumb" style="background-image:url('${project.image}');"></div>`
      : `<div class="thumb no-image"><span>No Picture</span></div>`;
    article.innerHTML = `
      <a class="card-block" href="#" onclick="showProjectDetail('${project.id}'); return false;" aria-label="${project.title}">
        ${thumb}
        <div class="overlay"><p class="meta">${project.meta}</p></div>
      </a>
      <h3 class="title" id="projectTitle${index + 1}">${project.title}</h3>
    `;
    projectsContainer.appendChild(article);
  });
};

window.renderCourses = function renderCourses() {
  if (!window.siteData || !Array.isArray(window.siteData.courses)) return;

  const coursesContainer = document.querySelector('#courses .grid');
  if (!coursesContainer) return;

  coursesContainer.innerHTML = '';

  window.siteData.courses.forEach((course, index) => {
    const article = document.createElement('article');
    article.className = 'card project media-card';
    const thumb = course.image
      ? `<div class="thumb" style="background-image:url('${course.image}');"></div>`
      : `<div class="thumb no-image"><span>No Picture</span></div>`;
    article.innerHTML = `
      <a class="card-block" href="#" onclick="showCourseDetail('${course.id}'); return false;" aria-label="${course.title}">
        ${thumb}
        <div class="overlay"><p class="meta">${course.meta}</p></div>
      </a>
      <h3 class="title" id="courseTitle${index + 1}">${course.title}</h3>
    `;
    coursesContainer.appendChild(article);
  });
};

window.toggleLanguage = function toggleLanguage() {
  // Only allow language toggle on home page
  const main = document.querySelector('main');
  const isDetailPage = main && main.hasAttribute('data-original-content');
  if (isDetailPage) return;

  window.currentLanguage = window.currentLanguage === 'en' ? 'fa' : 'en';
  window.updateLanguage();
};

window.updateLanguage = function updateLanguage() {
  if (!window.translations || !window.translations[window.currentLanguage]) return;

  const lang = window.translations[window.currentLanguage];

  // Update HTML attributes
  const html = document.getElementById('htmlElement');
  if (html) {
    html.lang = window.currentLanguage;
    html.dir = window.currentLanguage === 'fa' ? 'rtl' : 'ltr';
  }

  // Update page meta
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = lang.pageTitle || '';
  const pageDesc = document.getElementById('pageDescription');
  if (pageDesc) pageDesc.content = lang.pageDescription || '';

  // Update brand name
  const brandName = document.getElementById('brandName');
  if (brandName) brandName.textContent = lang.brandName || '';

  // Navigation
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || '';
  };
  setText('navHome', lang.navHome);
  setText('navProjects', lang.navProjects);
  setText('navCourses', lang.navCourses);
  setText('navResume', lang.navResume);
  setText('navContact', lang.navContact);

  // Hero
  setText('heroTitle', lang.heroTitle);
  setText('heroSubtitle', lang.heroSubtitle);
  setText('heroDesc', lang.heroDesc);

  // Home section
  setText('aboutTitle', lang.aboutTitle);
  setText('homeContent', lang.HomeContent);
  if (lang.HomeHighlights) {
    setText('yearsNum', lang.HomeHighlights.years);
    setText('yearsText', lang.HomeHighlights.yearsText);
    setText('projectsNum', lang.HomeHighlights.projects);
    setText('projectsText', lang.HomeHighlights.projectsText);
    setText('domainsNum', lang.HomeHighlights.domains);
    setText('domainsText', lang.HomeHighlights.domainsText);
  }

  // Skills
  setText('skillsTitle', lang.skillsTitle);
  if (window.siteData && window.siteData.skills && lang.skillGroups) {
    window.siteData.skills.forEach(group => {
      const groupEl = document.getElementById(`${group.id}Group`);
      if (groupEl && lang.skillGroups[group.id]) groupEl.textContent = lang.skillGroups[group.id];
    });
  }

  // Projects/Courses
  setText('projectsTitle', lang.projectsTitle);
  if (window.siteData && Array.isArray(window.siteData.projects)) {
    window.siteData.projects.forEach((project, index) => {
      const projectTitleEl = document.getElementById(`projectTitle${index + 1}`);
      if (projectTitleEl) projectTitleEl.textContent = project.title;
    });
  }

  setText('coursesTitle', lang.coursesTitle);
  if (window.siteData && Array.isArray(window.siteData.courses)) {
    window.siteData.courses.forEach((course, index) => {
      const courseTitleEl = document.getElementById(`courseTitle${index + 1}`);
      if (courseTitleEl) courseTitleEl.textContent = course.title;
    });
  }

  setText('resumeDesc', lang.resumeDesc);
  setText('educationTitle', lang.educationTitle);
  setText('experienceTitle', lang.experienceTitle);
  setText('resumeDownloadTitle', lang.resumeDownloadTitle);

  const resumeDownloadBtnLabel = document.getElementById('resumeDownloadBtnLabel');
  if (resumeDownloadBtnLabel) {
    resumeDownloadBtnLabel.textContent = lang.resumeDownload || 'Download Resume (PDF)';
  }

  setText('contactTitle', lang.contactTitle);

  // Toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = window.currentLanguage === 'en' ? 'فا' : 'EN';
    langToggle.title = window.currentLanguage === 'en' ? 'Switch to Farsi' : 'Switch to English';
  }

  // Close/menu aria labels
  const closeBtn = document.getElementById('closeBtn');
  if (closeBtn) closeBtn.setAttribute('aria-label', window.currentLanguage === 'en' ? 'Close menu' : 'بستن منو');
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) menuBtn.setAttribute('aria-label', window.currentLanguage === 'en' ? 'Menu' : 'منو');
};

window.showProjectDetail = function showProjectDetail(projectId) {
  if (!window.siteData || !Array.isArray(window.siteData.projects)) return;

  const project = window.siteData.projects.find(p => p.id === projectId);
  if (!project || !project.details) return;

  const details = project.details;
  const lang = window.translations[window.currentLanguage] || {};

  window.currentDetailPage.type = 'project';
  window.currentDetailPage.id = projectId;

  const main = document.querySelector('main');
  if (!main) return;
  const originalContent = main.innerHTML;
  main.setAttribute('data-original-content', originalContent);

  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.style.display = 'none';

  main.innerHTML = `
    <div class="container">
      <div class="project-detail">
        <div class="project-header">
          <h1>${details.title || project.title}</h1>
          <div class="project-meta">
            <span class="year">${details.year || ''}</span>
            <span class="category">${details.category || ''}</span>
          </div>
        </div>

        <div class="project-content">
          <div class="project-description">
            <h2>${window.currentLanguage === 'en' ? 'Description' : 'توضیحات'}</h2>
            <p>${details.description || ''}</p>
          </div>

          <div class="detail-gallery landscape" id="detailGalleryRoot">
            <h2>${window.currentLanguage === 'en' ? 'Gallery' : 'گالری'}</h2>
            <div class="gallery-slider-container">
              <div class="gallery-slider-wrapper">
                <button class="slider-btn slider-btn-prev" id="detailGalleryPrev" aria-label="Previous image">‹</button>
                <div class="gallery-slider" id="detailGallerySlider">
                  <div class="gallery-empty-message">
                    <p>Loading gallery…</p>
                  </div>
                </div>
                <button class="slider-btn slider-btn-next" id="detailGalleryNext" aria-label="Next image">›</button>
              </div>
              <div class="gallery-thumbnails" id="detailGalleryThumbnails"></div>
              <div class="gallery-counter">
                <span id="detailCurrentImage">0</span> / <span id="detailTotalImages">0</span>
              </div>
            </div>
          </div>

          <div class="project-technologies">
            <h2>${window.currentLanguage === 'en' ? 'Technologies' : 'فناوری‌ها'}</h2>
            <div class="tech-tags">
              ${(details.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          </div>

          <div class="project-features">
            <h2>${window.currentLanguage === 'en' ? 'Key Features' : 'ویژگی‌های کلیدی'}</h2>
            <ul>
              ${(details.features || []).map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = `${details.title || project.title} - ${lang.pageTitle || ''}`;

  if (window.initDetailGallery) {
    const folderLabel = project.folderName ? `projects/${project.folderName}/` : 'projects/<project>/';
    window.initDetailGallery({ basePath: project.basePath || '', folderLabel, maxAutoDetect: 20 });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showCourseDetail = function showCourseDetail(courseId) {
  if (!window.siteData || !Array.isArray(window.siteData.courses)) return;

  const course = window.siteData.courses.find(c => c.id === courseId);
  if (!course || !course.details) return;

  const details = course.details;
  const lang = window.translations[window.currentLanguage] || {};

  window.currentDetailPage.type = 'course';
  window.currentDetailPage.id = courseId;

  const main = document.querySelector('main');
  if (!main) return;
  const originalContent = main.innerHTML;
  main.setAttribute('data-original-content', originalContent);

  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.style.display = 'none';

  main.innerHTML = `
    <div class="container">
      <div class="course-detail">
        <div class="course-header">
          <h1>${details.title || course.title}</h1>
          <div class="course-meta">
            <span class="duration">${details.duration || ''}</span>
            <span class="level">${details.level || ''}</span>
            <span class="platform">${details.platform || ''}</span>
          </div>
        </div>

        <div class="course-content">
          <div class="course-description">
            <h2>${window.currentLanguage === 'en' ? 'Description' : 'توضیحات'}</h2>
            <p>${details.description || ''}</p>
          </div>

          <div class="detail-gallery landscape" id="detailGalleryRoot">
            <h2>${window.currentLanguage === 'en' ? 'Gallery' : 'گالری'}</h2>
            <div class="gallery-slider-container">
              <div class="gallery-slider-wrapper">
                <button class="slider-btn slider-btn-prev" id="detailGalleryPrev" aria-label="Previous image">‹</button>
                <div class="gallery-slider" id="detailGallerySlider">
                  <div class="gallery-empty-message">
                    <p>Loading gallery…</p>
                  </div>
                </div>
                <button class="slider-btn slider-btn-next" id="detailGalleryNext" aria-label="Next image">›</button>
              </div>
              <div class="gallery-thumbnails" id="detailGalleryThumbnails"></div>
              <div class="gallery-counter">
                <span id="detailCurrentImage">0</span> / <span id="detailTotalImages">0</span>
              </div>
            </div>
          </div>

          <div class="course-modules">
            <h2>${window.currentLanguage === 'en' ? 'Course Modules' : 'سرفصل‌های دوره'}</h2>
            <ul>
              ${(details.modules || []).map(module => `<li>${module}</li>`).join('')}
            </ul>
          </div>

          <div class="course-prerequisites">
            <h2>${window.currentLanguage === 'en' ? 'Prerequisites' : 'پیش‌نیازها'}</h2>
            <ul>
              ${(details.prerequisites || []).map(prereq => `<li>${prereq}</li>`).join('')}
            </ul>
          </div>

          <div class="course-outcomes">
            <h2>${window.currentLanguage === 'en' ? 'Learning Outcomes' : 'نتایج یادگیری'}</h2>
            <ul>
              ${(details.outcomes || []).map(outcome => `<li>${outcome}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = `${details.title || course.title} - ${lang.pageTitle || ''}`;

  if (window.initDetailGallery) {
    const folderLabel = course.folderName ? `courses/${course.folderName}/` : 'courses/<course>/';
    window.initDetailGallery({ basePath: course.basePath || '', folderLabel, maxAutoDetect: 20 });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showHomePage = function showHomePage() {
  const main = document.querySelector('main');
  if (!main) return;

  const originalContent = main.getAttribute('data-original-content');
  if (!originalContent) {
    location.reload();
    return;
  }

  main.innerHTML = originalContent;
  main.removeAttribute('data-original-content');

  window.currentDetailPage.type = null;
  window.currentDetailPage.id = null;

  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.style.display = 'block';

  window.initializeSite();

  const lang = window.translations[window.currentLanguage] || {};
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = lang.pageTitle || '';

  window.scrollTo({ top: 0, behavior: 'smooth' });
};


