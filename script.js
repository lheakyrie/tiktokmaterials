// TOP TOOLBAR NAVIGATION
const navCarousel = document.getElementById('nav-carousel');
const navDesigner = document.getElementById('nav-designer');
const sectionCarouselTool = document.getElementById('section-carousel-tool');
const sectionDesignerTool = document.getElementById('section-designer-tool');

navCarousel.addEventListener('click', () => {
  navCarousel.classList.add('active');
  navDesigner.classList.remove('active');
  sectionCarouselTool.classList.remove('hidden');
  sectionDesignerTool.classList.add('hidden');
});

navDesigner.addEventListener('click', () => {
  navDesigner.classList.add('active');
  navCarousel.classList.remove('active');
  sectionDesignerTool.classList.remove('hidden');
  sectionCarouselTool.classList.add('hidden');
});

// SECTION 1: CAROUSEL BUILDER LOGIC
const tabHook = document.getElementById('tab-hook');
const tabProduct = document.getElementById('tab-product');
const sectionHook = document.getElementById('section-hook');
const sectionProduct = document.getElementById('section-product');

const viewHook = document.getElementById('view-hook');
const viewProduct = document.getElementById('view-product');
const canvas = document.getElementById('carousel-canvas');
const previewBg = document.getElementById('preview-bg');
const overlay = document.getElementById('canvas-overlay');

const inputZoom = document.getElementById('input-img-zoom');
const inputPosY = document.getElementById('input-img-pos-y');
const inputDim = document.getElementById('input-img-dim');

let hookBgUrl = '';
let prodImgUrl = '';

function updateImageTransform() {
  previewBg.style.transform = `scale(${inputZoom.value}) translateY(${inputPosY.value}px)`;
}

inputZoom.addEventListener('input', updateImageTransform);
inputPosY.addEventListener('input', updateImageTransform);
inputDim.addEventListener('input', (e) => overlay.style.backgroundColor = `rgba(0, 0, 0, ${e.target.value})`);

tabHook.addEventListener('click', () => {
  tabHook.classList.add('active');
  tabProduct.classList.remove('active');
  sectionHook.classList.remove('hidden');
  sectionProduct.classList.add('hidden');
  viewHook.classList.remove('hidden');
  viewProduct.classList.add('hidden');
  canvas.classList.add('mode-hook');
  previewBg.src = hookBgUrl || '';
  if (!hookBgUrl) previewBg.classList.add('hidden');
});

tabProduct.addEventListener('click', () => {
  tabProduct.classList.add('active');
  tabHook.classList.remove('active');
  sectionProduct.classList.remove('hidden');
  sectionHook.classList.add('hidden');
  viewProduct.classList.remove('hidden');
  viewHook.classList.add('hidden');
  canvas.classList.remove('mode-hook');
  if (prodImgUrl) {
    previewBg.src = prodImgUrl;
    previewBg.classList.remove('hidden');
  }
});

document.getElementById('input-hook-title').addEventListener('input', (e) => document.getElementById('preview-hook-title').textContent = e.target.value);
document.getElementById('input-hook-sub').addEventListener('input', (e) => document.getElementById('preview-hook-sub').textContent = e.target.value);
document.getElementById('input-prod-title').addEventListener('input', (e) => document.getElementById('preview-prod-title').textContent = e.target.value);
document.getElementById('input-prod-desc').addEventListener('input', (e) => document.getElementById('preview-prod-desc').textContent = e.target.value);
document.getElementById('input-prod-cta').addEventListener('input', (e) => document.getElementById('preview-prod-cta').textContent = e.target.value);

document.getElementById('input-hook-bg').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const r = new FileReader();
    r.onload = (evt) => { hookBgUrl = evt.target.result; previewBg.src = hookBgUrl; previewBg.classList.remove('hidden'); };
    r.readAsDataURL(file);
  }
});

document.getElementById('input-prod-img').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const r = new FileReader();
    r.onload = (evt) => { prodImgUrl = evt.target.result; previewBg.src = prodImgUrl; previewBg.classList.remove('hidden'); };
    r.readAsDataURL(file);
  }
});

document.getElementById('download-btn').addEventListener('click', () => {
  html2canvas(canvas, { scale: 2 }).then((cvs) => {
    const link = document.createElement('a');
    link.download = 'carousel-slide-3x4.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
  });
});

// SECTION 2: IMAGE DESIGNER STUDIO LOGIC
const designerCanvas = document.getElementById('designer-canvas');
const frame2 = document.querySelector('.frame-2');
const layoutBtns = document.querySelectorAll('.layout-btn');

layoutBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    layoutBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.layout;

    if (mode === 'single') {
      designerCanvas.className = 'designer-canvas layout-single';
      frame2.classList.add('hidden');
    } else if (mode === 'grid2') {
      designerCanvas.className = 'designer-canvas layout-grid2';
      frame2.classList.remove('hidden');
    }
  });
});

document.getElementById('designer-border-color').addEventListener('input', (e) => {
  document.querySelectorAll('.design-frame').forEach(f => f.style.borderColor = e.target.value);
});

document.getElementById('designer-img-1').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const r = new FileReader();
    r.onload = (evt) => document.getElementById('des-img-preview-1').src = evt.target.result;
    r.readAsDataURL(file);
  }
});

document.getElementById('designer-img-2').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const r = new FileReader();
    r.onload = (evt) => document.getElementById('des-img-preview-2').src = evt.target.result;
    r.readAsDataURL(file);
  }
});

document.getElementById('download-designer-btn').addEventListener('click', () => {
  html2canvas(designerCanvas, { scale: 2 }).then((cvs) => {
    const link = document.createElement('a');
    link.download = 'designed-image-layout.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
  });
});
