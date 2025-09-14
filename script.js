(function(){
  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const links = document.getElementById('navlinks');
  const closeBtn = document.querySelector('.close-btn');
  
  menuBtn && menuBtn.addEventListener('click', ()=> links.classList.toggle('open'));
  closeBtn && closeBtn.addEventListener('click', ()=> links.classList.remove('open'));

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href'); if (id.length>1){ e.preventDefault(); document.querySelector(id)?.scrollIntoView({behavior:'smooth'}); links?.classList.remove('open'); }
    });
  });

  // active on scroll
  const sections = [...document.querySelectorAll('section[id]')];
  const navAs = document.querySelectorAll('.navlinks a');
  const onScroll = () => {
    const y = window.scrollY + 120;
    let current = '';
    sections.forEach(s=>{ if (s.offsetTop <= y) current = s.id; });
    navAs.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll); onScroll();
})();