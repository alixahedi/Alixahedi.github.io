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

window.updateSocialLinks = function updateSocialLinks() {
  const social = window.siteData && window.siteData.social;
  if (!social) return;

  const cta = document.querySelector('.hero .cta');
  const contact = document.querySelector('#contact .contact');

  const render = (container) => {
    if (!container) return;
    container.innerHTML = '';
    if (social.email) container.innerHTML += `<a class="btn primary" href="${social.email}" title="Email me"><i class="fas fa-envelope"></i></a>`;
    if (social.github) container.innerHTML += `<a class="btn ghost" target="_blank" rel="noopener" href="${social.github}" title="GitHub"><i class="fab fa-github"></i></a>`;
    if (social.linkedin) container.innerHTML += `<a class="btn ghost" target="_blank" rel="noopener" href="${social.linkedin}" title="LinkedIn"><i class="fab fa-linkedin"></i></a>`;
    if (social.telegram) container.innerHTML += `<a class="btn ghost" target="_blank" rel="noopener" href="${social.telegram}" title="Telegram"><i class="fab fa-telegram"></i></a>`;
    if (social.youtube) container.innerHTML += `<a class="btn ghost" target="_blank" rel="noopener" href="${social.youtube}" title="YouTube"><i class="fab fa-youtube"></i></a>`;
    if (social.instagram) container.innerHTML += `<a class="btn ghost" target="_blank" rel="noopener" href="${social.instagram}" title="Instagram"><i class="fab fa-instagram"></i></a>`;
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
  setText('homeTitle', lang.HomeTitle);
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

  setText('resumeTitle', lang.resumeTitle);
  setText('resumeDesc', lang.resumeDesc);
  setText('educationTitle', lang.educationTitle);
  setText('experienceTitle', lang.experienceTitle);
  setText('resumeDownloadTitle', lang.resumeDownloadTitle);

  const resumeDownloadBtn = document.getElementById('resumeDownloadBtn');
  if (resumeDownloadBtn) resumeDownloadBtn.textContent = lang.resumeDownload || 'Download Resume (PDF)';

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


