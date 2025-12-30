// Gallery slider (Salma-style), reusable for project/course detail pages.
// Convention: images live under basePath and are named image1.(jpg|png|webp|gif|jpeg) ... imageN.*
// Optional captions: image1.txt where first line is title and remaining lines are description.

(function () {
  let autoSlideInterval = null;
  const autoSlideDelay = 5000;

  function $(id) {
    return document.getElementById(id);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  function startAutoSlide(nextFn) {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => nextFn(), autoSlideDelay);
  }

  function checkImageExists(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  async function loadTextFile(path) {
    try {
      const response = await fetch(path, { cache: 'no-cache' });
      if (response.ok) {
        const text = await response.text();
        return String(text || '').trim();
      }
    } catch (_) {}
    return null;
  }

  function parseImageData(text) {
    if (!text) return { title: '', description: '' };
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    return { title: lines[0] || '', description: lines.slice(1).join(' ') || '' };
  }

  async function autoDetectImages(basePath, maxDetect = 20) {
    const exts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const images = [];
    const imageData = [];

    for (let i = 1; i <= maxDetect; i++) {
      let found = null;
      for (const ext of exts) {
        const imgPath = `${basePath}image${i}.${ext}`;
        // eslint-disable-next-line no-await-in-loop
        const exists = await checkImageExists(imgPath);
        if (exists) {
          found = imgPath;
          break;
        }
      }

      if (found) {
        images.push(found);
        // eslint-disable-next-line no-await-in-loop
        const txt = await loadTextFile(`${basePath}image${i}.txt`);
        imageData.push(parseImageData(txt));
      }
    }

    return { images, imageData };
  }

  function setEmptyMessage(folderLabel) {
    const slider = $('detailGallerySlider');
    const thumbs = $('detailGalleryThumbnails');
    const current = $('detailCurrentImage');
    const total = $('detailTotalImages');
    if (slider) {
      slider.innerHTML = `<div class="gallery-empty-message"><p>No images found. Please add <code>image1.jpg</code>, <code>image2.png</code>, ... into <code>${folderLabel}</code>.</p></div>`;
    }
    if (thumbs) thumbs.innerHTML = '';
    if (current) current.textContent = '0';
    if (total) total.textContent = '0';
  }

  window.initDetailGallery = async function initDetailGallery(opts) {
    const basePath = String(opts?.basePath || '');
    const folderLabel = String(opts?.folderLabel || basePath || '');
    const maxAutoDetect = Number.isFinite(opts?.maxAutoDetect) ? opts.maxAutoDetect : 20;

    stopAutoSlide();

    if (!basePath) {
      setEmptyMessage(folderLabel || 'this folder');
      return;
    }

    const slider = $('detailGallerySlider');
    const thumbs = $('detailGalleryThumbnails');
    if (!slider || !thumbs) return;
    const galleryRoot = $('detailGalleryRoot');

    const { images, imageData } = await autoDetectImages(basePath, maxAutoDetect);
    if (!images.length) {
      setEmptyMessage(folderLabel);
      return;
    }

    let currentIndex = 0;

    function applyOrientationClass(imgEl) {
      if (!galleryRoot || !imgEl) return;
      const w = imgEl.naturalWidth || 0;
      const h = imgEl.naturalHeight || 0;
      if (!w || !h) return;

      galleryRoot.classList.remove('portrait', 'landscape', 'square');
      if (h > w * 1.05) galleryRoot.classList.add('portrait');
      else if (w > h * 1.05) galleryRoot.classList.add('landscape');
      else galleryRoot.classList.add('square');
    }

    function updateCounter() {
      const current = $('detailCurrentImage');
      const total = $('detailTotalImages');
      if (current) current.textContent = String(currentIndex + 1);
      if (total) total.textContent = String(images.length);
    }

    function showSlide(index) {
      const slides = document.querySelectorAll('#detailGallerySlider .gallery-slide');
      const thumbsEls = document.querySelectorAll('#detailGalleryThumbnails .gallery-thumbnail');

      slides.forEach(s => s.classList.remove('active'));
      thumbsEls.forEach(t => t.classList.remove('active'));

      if (slides[index]) slides[index].classList.add('active');
      if (thumbsEls[index]) thumbsEls[index].classList.add('active');

      currentIndex = index;
      updateCounter();

      // Update container aspect based on the active image orientation
      const activeImg = slides[index] ? slides[index].querySelector('img') : null;
      if (activeImg) {
        if (activeImg.complete) applyOrientationClass(activeImg);
        else activeImg.addEventListener('load', () => applyOrientationClass(activeImg), { once: true });
      }

      const container = $('detailGalleryThumbnails');
      if (container && thumbsEls[index]) {
        const left = thumbsEls[index].offsetLeft - container.offsetLeft;
        container.scrollTo({ left: Math.max(0, left - container.clientWidth / 2), behavior: 'smooth' });
      }
    }

    function next() {
      const nextIndex = (currentIndex + 1) % images.length;
      showSlide(nextIndex);
    }

    function prev() {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      showSlide(prevIndex);
    }

    // Build slides
    slider.innerHTML = '';
    images.forEach((src, index) => {
      const data = imageData[index] || { title: '', description: '' };
      const slide = document.createElement('div');
      slide.className = `gallery-slide${index === 0 ? ' active' : ''}`;
      slide.innerHTML = `
        <img src="${src}" alt="Gallery image ${index + 1}">
        <div class="gallery-slide-overlay">
          <h3>${data.title || ''}</h3>
          <p>${data.description || ''}</p>
        </div>
      `;
      slider.appendChild(slide);
    });

    // Build thumbnails
    thumbs.innerHTML = '';
    images.forEach((src, index) => {
      const data = imageData[index] || { title: '', description: '' };
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `gallery-thumbnail${index === 0 ? ' active' : ''}`;
      btn.setAttribute('aria-label', `View image ${index + 1}`);
      btn.innerHTML = `
        <img src="${src}" alt="Thumbnail ${index + 1}">
        <div class="gallery-thumbnail-overlay">
          <h4>${data.title || ''}</h4>
          <p>${data.description || ''}</p>
        </div>
      `;
      btn.addEventListener('click', () => {
        showSlide(index);
        startAutoSlide(next);
      });
      thumbs.appendChild(btn);
    });

    // Hook buttons
    const prevBtn = $('detailGalleryPrev');
    const nextBtn = $('detailGalleryNext');
    if (prevBtn) prevBtn.onclick = () => { prev(); startAutoSlide(next); };
    if (nextBtn) nextBtn.onclick = () => { next(); startAutoSlide(next); };

    updateCounter();
    showSlide(0);
    startAutoSlide(next);
  };

  window.destroyDetailGallery = function destroyDetailGallery() {
    stopAutoSlide();
  };
})();


