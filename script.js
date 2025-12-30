// Interaction/controller layer (Salma-style model)
// Depends on: content.js (siteData), populate.js (initializeSite, toggleLanguage, showHomePage)

window.toggleMobileMenu = function toggleMobileMenu() {
  const navlinks = document.getElementById('navlinks');
  if (!navlinks) return;
  navlinks.classList.toggle('active');
};

window.closeMobileMenu = function closeMobileMenu() {
  const navlinks = document.getElementById('navlinks');
  if (!navlinks) return;
  navlinks.classList.remove('active');
};

let navigationInitialized = false;
window.initializeNavigation = function initializeNavigation() {
  if (navigationInitialized) return;
  navigationInitialized = true;

  document.addEventListener('click', function(e) {
    const navAnchor = e.target && e.target.closest && e.target.closest('.navlinks a');
    if (navAnchor) {
      e.preventDefault();
      const href = navAnchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);

        const main = document.querySelector('main');
        const isDetailPage = main && main.hasAttribute('data-original-content');

        if (isDetailPage) {
          if (window.showHomePage) window.showHomePage();
          setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          const targetElement = document.getElementById(targetId);
          if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        window.closeMobileMenu();
      }
      return;
    }

    if (e.target && e.target.closest && e.target.closest('#menuBtn')) {
      window.toggleMobileMenu();
      return;
    }

    if (e.target && e.target.closest && e.target.closest('#closeBtn')) {
      window.closeMobileMenu();
    }
  });
};

document.addEventListener('DOMContentLoaded', async function() {
  if (window.loadDynamicCollections) {
    await window.loadDynamicCollections();
  }

  if (window.initializeSite) window.initializeSite();

  if (window.initializeNavigation) window.initializeNavigation();

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const langToggle = document.getElementById('langToggle');
  if (langToggle && window.toggleLanguage) {
    langToggle.addEventListener('click', window.toggleLanguage);
  }
});
