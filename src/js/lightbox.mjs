// Reusable lightbox to display large images with navigation
let lightboxOverlay = null;

function createLightbox() {
  if (lightboxOverlay) return;
  lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay hidden';
  lightboxOverlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
    <img class="lightbox-img" src="" alt="" />
    <button class="lightbox-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
  `;
  document.body.appendChild(lightboxOverlay);

  // Event listeners
  lightboxOverlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightboxOverlay.querySelector('.lightbox-prev').addEventListener('click', showPrev);
  lightboxOverlay.querySelector('.lightbox-next').addEventListener('click', showNext);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
  document.addEventListener('keydown', handleKeyDown);
}

let currentImages = [];
let currentIndex = 0;

function openLightbox(images, index = 0) {
  createLightbox();
  currentImages = images;
  currentIndex = index;
  updateImage();
  lightboxOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  lightboxOverlay.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  lightboxOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  currentImages = [];
  currentIndex = 0;
}

function updateImage() {
  const img = lightboxOverlay.querySelector('.lightbox-img');
  if (currentImages.length > 0 && currentIndex >= 0 && currentIndex < currentImages.length) {
    img.src = currentImages[currentIndex];
    img.alt = `Image ${currentIndex + 1} of ${currentImages.length}`;
  }
}

function showPrev() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateImage();
}

function showNext() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateImage();
}

function handleKeyDown(e) {
  if (lightboxOverlay.classList.contains('hidden')) return;
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    showPrev();
  } else if (e.key === 'ArrowRight') {
    showNext();
  }
}

export { openLightbox, closeLightbox };