// TOP TOOLBAR NAVIGATION SWITCHER
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

// TOOL 1: CAROUSEL BUILDER LOGIC
const tabHook = document.getElementById('tab-hook');
const tabProduct = document.getElementById('tab-product');
const sectionHook = document.getElementById('section-hook');
const sectionProduct = document.getElementById('section-product');

const viewHook = document.getElementById('view-hook');
const viewProduct = document.getElementById('view-product');
const carouselCanvas = document.getElementById('carousel-canvas');
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
  carouselCanvas.classList.add('mode-hook');
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
  carouselCanvas.classList.remove('mode-hook');
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

document.getElementById('download-carousel-btn').addEventListener('click', () => {
  html2canvas(carouselCanvas, { scale: 2 }).then((cvs) => {
    const link = document.createElement('a');
    link.download = 'carousel-slide-3x4.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
  });
});

// TOOL 2: IMAGE DESIGNER STUDIO LOGIC
const layoutCanvas = document.getElementById('layout-canvas');
const presetBtns = document.querySelectorAll('.preset-btn');
const bgSelect = document.getElementById('bg-style-select');

const prev1 = document.getElementById('prev-img-1');
const prev2 = document.getElementById('prev-img-2');
const prev3 = document.getElementById('prev-img-3');
const prev4 = document.getElementById('prev-img-4');

document.getElementById('img-input-1').addEventListener('change', (e) => loadImg(e, prev1));
document.getElementById('img-input-2').addEventListener('change', (e) => loadImg(e, prev2));
document.getElementById('img-input-3').addEventListener('change', (e) => loadImg(e, prev3));

function loadImg(event, targetElement) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => { 
      targetElement.src = e.target.result;
      if (targetElement === prev3) prev4.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

presetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    presetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    layoutCanvas.className = `layout-canvas ${btn.dataset.layout} ${bgSelect.value}`;
  });
});

bgSelect.addEventListener('change', (e) => {
  const activeLayout = document.querySelector('.preset-btn.active').dataset.layout;
  layoutCanvas.className = `layout-canvas ${activeLayout} ${e.target.value}`;
});

document.getElementById('accent-color').addEventListener('input', (e) => {
  const color = e.target.value;
  document.querySelectorAll('.offset-overlap .box-2, .diagonal-geo .box-2').forEach(box => box.style.borderColor = color);
});

document.getElementById('toggle-safezone').addEventListener('change', (e) => {
  document.getElementById('safezone-mask').classList.toggle('hidden', !e.target.checked);
});

document.getElementById('download-designer-btn').addEventListener('click', () => {
  const mask = document.getElementById('safezone-mask');
  mask.style.borderTop = 'none';

  html2canvas(layoutCanvas, { scale: 2 }).then((cvs) => {
    const link = document.createElement('a');
    link.download = '3d-model-designed-slide.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
    mask.style.borderTop = '1px dashed rgba(255, 94, 0, 0.5)';
  });
});
