// TAB SWITCHER (SLIDE 1 HOOK vs PRODUCT SLIDE)
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

// STORE PER-PHOTO TRANSFORM AND FIT SETTINGS FOR PRODUCT SLIDE
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

// DYNAMIC LABEL SELECTORS FOR BADGES
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

  previewBg.style.transform = `scale(${scale}) translate(${panX}px,${panY}px) translateZ(0)`;
  
  const filterStr = `blur(${blur}px)`; previewBg.style.filter = filterStr; previewBg.style.webkitFilter = filterStr;  canvasOverlay.style.background = `rgba(0, 0, 0, ${dim})`;
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

  const img = document.getElementById(`prev-img-${boxId}`); const blurBackdrop = document.getElementById(`bg-blur-${boxId}`);

  img.style.objectFit = state.fit;
  img.style.transform = `scale(${state.zoom}) translate(${state.panX}px, ${state.panY}px)`;  const filterString = `blur(${state.blur
