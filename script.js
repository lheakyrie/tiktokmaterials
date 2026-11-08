// TAB SWITCHER
const tabHook = document.getElementById('tab-hook');
const tabProduct = document.getElementById('tab-product');
const sectionHook = document.getElementById('section-hook');
const sectionProduct = document.getElementById('section-product');

const viewHook = document.getElementById('view-hook');
const viewProduct = document.getElementById('view-product');
const carouselCanvas = document.getElementById('carousel-canvas');
const previewBg = document.getElementById('preview-bg');
const canvasOverlay = document.getElementById('canvas-overlay');
const layoutStudioContainer = document.getElementById('layout-studio-container');

let hookBgUrl = '';

tabHook.addEventListener('click', () => {
  tabHook.classList.add('active');
  tabProduct.classList.remove('active');
  sectionHook.classList.remove('hidden');
  sectionProduct.classList.add('hidden');
  viewHook.classList.remove('hidden');
  viewProduct.classList.add('hidden');
  layoutStudioContainer.classList.add('hidden');
  carouselCanvas.classList.add('mode-hook');
  
  if (hookBgUrl) {
    previewBg.src = hookBgUrl;
    previewBg.classList.remove('hidden');
  } else {
    previewBg.classList.add('hidden');
  }
});

tabProduct.addEventListener('click', () => {
  tabProduct.classList.add('active');
  tabHook.classList.remove('active');
  sectionProduct.classList.remove('hidden');
  sectionHook.classList.add('hidden');
  viewProduct.classList.remove('hidden');
  viewHook.classList.add('hidden');
  layoutStudioContainer.classList.remove('hidden');
  previewBg.classList.add('hidden');
  carouselCanvas.classList.remove('mode-hook');
  updateCanvasClasses();
});

// REAL-TIME TEXT UPDATES
document.getElementById('input-hook-title').addEventListener('input', (e) => document.getElementById('preview-hook-title').textContent = e.target.value);
document.getElementById('input-hook-sub').addEventListener('input', (e) => document.getElementById('preview-hook-sub').textContent = e.target.value);
document.getElementById('input-prod-title').addEventListener('input', (e) => document.getElementById('preview-prod-title').textContent = e.target.value);
document.getElementById('input-prod-desc').addEventListener('input', (e) => document.getElementById('preview-prod-desc').textContent = e.target.value);
document.getElementById('input-prod-cta').addEventListener('input', (e) => document.getElementById('preview-prod-cta').textContent = e.target.value);

// DYNAMIC LABEL SELECTORS
document.getElementById('label-select-1').addEventListener('change', (e) => { document.getElementById('badge-tag-1').textContent = e.target.value; });
document.getElementById('label-select-2').addEventListener('change', (e) => { document.getElementById('badge-tag-2').textContent = e.target.value; });
document.getElementById('label-select-3').addEventListener('change', (e) => { document.getElementById('badge-tag-3').textContent = e.target.value; });

// SLIDE 1 BACKGROUND UPLOAD & TRANSFORM CONTROLS
const sliderZoom = document.getElementById('slider-zoom');
const sliderPanX = document.getElementById('slider-pan-x');
const sliderPanY = document.getElementById('slider-pan-y');
const sliderDim = document.getElementById('slider-dim');
const sliderBlur = document.getElementById('slider-blur');

function applyHookImageTransforms() {
  const scale = sliderZoom.value;
  const panX = sliderPanX.value;
  const panY = sliderPanY.value;
  const blur = sliderBlur.value;
  const dim = sliderDim.value;

  previewBg.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
  previewBg.style.filter = `blur(${blur}px)`;
  canvasOverlay.style.background = `rgba(0, 0, 0, ${dim})`;
}

[sliderZoom, sliderPanX, sliderPanY, sliderDim, sliderBlur].forEach(slider => {
  slider.addEventListener('input', applyHookImageTransforms);
});

document.getElementById('input-hook-bg').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const r = new FileReader();
    r.onload = (evt) => { 
      hookBgUrl = evt.target.result; 
      previewBg.src = hookBgUrl; 
      previewBg.classList.remove('hidden');
      applyHookImageTransforms();
    };
    r.readAsDataURL(file);
  }
});

// PRODUCT SLIDE IMAGE TRANSFORM CONTROLS
const sliderProdZoom = document.getElementById('slider-prod-zoom');
const sliderProdPanX = document.getElementById('slider-prod-pan-x');
const sliderProdPanY = document.getElementById('slider-prod-pan-y');
const sliderProdDim = document.getElementById('slider-prod-dim');
const sliderProdBlur = document.getElementById('slider-prod-blur');

function applyProductImageTransforms() {
  const scale = sliderProdZoom.value;
  const panX = sliderProdPanX.value;
  const panY = sliderProdPanY.value;
  const blur = sliderProdBlur.value;
  const dim = sliderProdDim.value;

  layoutStudioContainer.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
  layoutStudioContainer.style.filter = `blur(${blur}px)`;
  
  if (!viewProduct.classList.contains('hidden')) {
    canvasOverlay.style.background = `rgba(0, 0, 0, ${dim})`;
  }
}

[sliderProdZoom, sliderProdPanX, sliderProdPanY, sliderProdDim, sliderProdBlur].forEach(slider => {
  slider.addEventListener('input', applyProductImageTransforms);
});

// INTEGRATED LAYOUT STUDIO CONTROLS
const presetBtns = document.querySelectorAll('.preset-btn');
const bgSelect = document.getElementById('bg-style-select');

const prev1 = document.getElementById('prev-img-1');
const prev2 = document.getElementById('prev-img-2');
const prev3 = document.getElementById('prev-img-3');
const prev4 = document.getElementById('prev-img-4');
const prev5 = document.getElementById('prev-img-5');

document.getElementById('img-input-1').addEventListener('change', (e) => loadImg(e, prev1));
document.getElementById('img-input-2').addEventListener('change', (e) => loadImg(e, prev2));
document.getElementById('img-input-3').addEventListener('change', (e) => loadImg(e, prev3));
document.getElementById('img-input-4').addEventListener('change', (e) => loadImg(e, prev4));
document.getElementById('img-input-5').addEventListener('change', (e) => loadImg(e, prev5));

function loadImg(event, targetElement) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => { targetElement.src = e.target.result; };
    reader.readAsDataURL(file);
  }
}

presetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    presetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateCanvasClasses();
  });
});

bgSelect.addEventListener('change', () => {
  updateCanvasClasses();
});

function updateCanvasClasses() {
  const activeLayout = document.querySelector('.preset-btn.active').dataset.layout;
  const isHook = !viewHook.classList.contains('hidden');
  const modeClass = isHook ? 'mode-hook' : '';
  carouselCanvas.className = `carousel-canvas ${modeClass} ${activeLayout} ${bgSelect.value}`;
}

document.getElementById('accent-color').addEventListener('input', (e) => {
  const color = e.target.value;
  document.querySelectorAll('.inset-stack-right .box-4, .inset-stack-right .box-5, .layout-3 .box-2').forEach(box => box.style.borderColor = color);
});

// EXPORT CANVAS AS PNG
document.getElementById('download-carousel-btn').addEventListener('click', () => {
  html2canvas(carouselCanvas, { scale: 2 }).then((cvs) => {
    const link = document.createElement('a');
    const isHook = !viewHook.classList.contains('hidden');
    link.download = isHook ? 'carousel-slide-1-hook.png' : 'carousel-product-slide.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
  });
});