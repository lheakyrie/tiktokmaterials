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

const adjustmentsHook = document.getElementById('adjustments-hook');
const adjustmentsProduct = document.getElementById('adjustments-product');

let hookBgUrl = '';

// STORE PER-PHOTO TRANSFORM AND FIT SETTINGS
const photoStates = {
  1: { zoom: 1, panX: 0, panY: 0, dim: 0, blur: 0, fit: 'cover' },
  2: { zoom: 1, panX: 0, panY: 0, dim: 0, blur: 0, fit: 'cover' },
  3: { zoom: 1, panX: 0, panY: 0, dim: 0, blur: 0, fit: 'cover' },
  4: { zoom: 1, panX: 0, panY: 0, dim: 0, blur: 0, fit: 'cover' },
  5: { zoom: 1, panX: 0, panY: 0, dim: 0, blur: 0, fit: 'cover' },
};

let activeBoxId = 1;

tabHook.addEventListener('click', () => {
  tabHook.classList.add('active');
  tabProduct.classList.remove('active');
  sectionHook.classList.remove('hidden');
  sectionProduct.classList.add('hidden');
  viewHook.classList.remove('hidden');
  viewProduct.classList.add('hidden');
  layoutStudioContainer.classList.add('hidden');
  carouselCanvas.classList.add('mode-hook');

  adjustmentsHook.classList.remove('hidden');
  adjustmentsProduct.classList.add('hidden');
  
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

  adjustmentsProduct.classList.remove('hidden');
  adjustmentsHook.classList.add('hidden');
  
  updateCanvasClasses();
  setActivePhotoBox(activeBoxId);
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

// PRODUCT SLIDE INDIVIDUAL PHOTO ADJUSTMENTS
const selectTargetBox = document.getElementById('select-target-box');
const selectFitMode = document.getElementById('select-fit-mode');
const sliderProdZoom = document.getElementById('slider-prod-zoom');
const sliderProdPanX = document.getElementById('slider-prod-pan-x');
const sliderProdPanY = document.getElementById('slider-prod-pan-y');
const sliderProdDim = document.getElementById('slider-prod-dim');
const sliderProdBlur = document.getElementById('slider-prod-blur');

function setActivePhotoBox(boxId) {
  activeBoxId = boxId;
  selectTargetBox.value = boxId;

  document.querySelectorAll('.photo-box').forEach(box => {
    box.classList.toggle('active-box', parseInt(box.dataset.box) === parseInt(boxId));
  });

  const state = photoStates[boxId];
  selectFitMode.value = state.fit;
  sliderProdZoom.value = state.zoom;
  sliderProdPanX.value = state.panX;
  sliderProdPanY.value = state.panY;
  sliderProdDim.value = state.dim;
  sliderProdBlur.value = state.blur;
}

selectTargetBox.addEventListener('change', (e) => {
  setActivePhotoBox(parseInt(e.target.value));
});

// CANVAS CLICK TO SELECT FRAME
document.querySelectorAll('.photo-box').forEach(box => {
  box.addEventListener('click', (e) => {
    e.stopPropagation();
    setActivePhotoBox(parseInt(box.dataset.box));
  });
});

function applyActivePhotoTransforms() {
  const boxId = activeBoxId;
  const state = photoStates[boxId];

  state.fit = selectFitMode.value;
  state.zoom = parseFloat(sliderProdZoom.value);
  state.panX = parseFloat(sliderProdPanX.value);
  state.panY = parseFloat(sliderProdPanY.value);
  state.dim = parseFloat(sliderProdDim.value);
  state.blur = parseFloat(sliderProdBlur.value);

  const img = document.getElementById(`prev-img-${boxId}`);
  const blurBackdrop = document.getElementById(`bg-blur-${boxId}`);

  img.style.objectFit = state.fit;
  img.style.transform = `scale(${state.zoom}) translate(${state.panX}px, ${state.panY}px)`;
  img.style.filter = `blur(${state.blur}px) brightness(${1 - state.dim})`;

  if (state.fit === 'contain') {
    blurBackdrop.style.display = 'block';
  } else {
    blurBackdrop.style.display = 'none';
  }
}

[selectFitMode, sliderProdZoom, sliderProdPanX, sliderProdPanY, sliderProdDim, sliderProdBlur].forEach(ctrl => {
  ctrl.addEventListener('input', applyActivePhotoTransforms);
  ctrl.addEventListener('change', applyActivePhotoTransforms);
});

// INTEGRATED LAYOUT STUDIO CONTROLS
const presetBtns = document.querySelectorAll('.preset-btn');
const bgSelect = document.getElementById('bg-style-select');

document.getElementById('img-input-1').addEventListener('change', (e) => loadImg(e, 1));
document.getElementById('img-input-2').addEventListener('change', (e) => loadImg(e, 2));
document.getElementById('img-input-3').addEventListener('change', (e) => loadImg(e, 3));
document.getElementById('img-input-4').addEventListener('change', (e) => loadImg(e, 4));
document.getElementById('img-input-5').addEventListener('change', (e) => loadImg(e, 5));

function loadImg(event, boxId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => { 
      const srcUrl = e.target.result;
      document.getElementById(`prev-img-${boxId}`).src = srcUrl;
      document.getElementById(`bg-blur-${boxId}`).src = srcUrl;
      applyActivePhotoTransforms();
    };
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

// EXPORT CANVAS AS PNG (FIXED WHITE CORNERS & ACCURATE CAPTURE)
document.getElementById('download-carousel-btn').addEventListener('click', () => {
  const canvasElement = document.getElementById('carousel-canvas');

  // Temporarily remove active selection outline so it doesn't render in the PNG
  const activeBox = document.querySelector('.photo-box.active-box');
  if (activeBox) activeBox.classList.remove('active-box');

  html2canvas(canvasElement, {
    scale: 3,
    backgroundColor: null,
    useCORS: true,
    allowTaint: true,
    logging: false
  }).then((cvs) => {
    const link = document.createElement('a');
    const isHook = !viewHook.classList.contains('hidden');
    link.download = isHook ? 'carousel-slide-1-hook.png' : 'carousel-product-slide.png';
    link.href = cvs.toDataURL('image/png');
    link.click();

    // Restore active box highlight
    if (activeBox) activeBox.classList.add('active-box');
  });
});
