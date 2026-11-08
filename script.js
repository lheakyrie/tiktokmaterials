const tabHook = document.getElementById('tab-hook');
const tabProduct = document.getElementById('tab-product');
const sectionHook = document.getElementById('section-hook');
const sectionProduct = document.getElementById('section-product');

const viewHook = document.getElementById('view-hook');
const viewProduct = document.getElementById('view-product');
const canvas = document.getElementById('carousel-canvas');
const previewBg = document.getElementById('preview-bg');
const overlay = document.getElementById('canvas-overlay');

// Image adjustment inputs
const inputZoom = document.getElementById('input-img-zoom');
const inputPosY = document.getElementById('input-img-pos-y');
const inputDim = document.getElementById('input-img-dim');

let hookBgUrl = '';
let prodImgUrl = '';

// Update CSS image transforms
function updateImageTransform() {
  const scale = inputZoom.value;
  const posY = inputPosY.value;
  previewBg.style.transform = `scale(${scale}) translateY(${posY}px)`;
}

inputZoom.addEventListener('input', updateImageTransform);
inputPosY.addEventListener('input', updateImageTransform);

inputDim.addEventListener('input', (e) => {
  overlay.style.backgroundColor = `rgba(0, 0, 0, ${e.target.value})`;
});

// Tab Switcher logic
tabHook.addEventListener('click', () => {
  tabHook.classList.add('active');
  tabProduct.classList.remove('active');
  sectionHook.classList.remove('hidden');
  sectionProduct.classList.add('hidden');
  
  viewHook.classList.remove('hidden');
  viewProduct.classList.add('hidden');
  canvas.classList.add('mode-hook');

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
  canvas.classList.remove('mode-hook');

  if (prodImgUrl) {
    previewBg.src = prodImgUrl;
    previewBg.classList.remove('hidden');
  }
});

// Real-time Text updates for Slide 1
document.getElementById('input-hook-title').addEventListener('input', (e) => {
  document.getElementById('preview-hook-title').textContent = e.target.value;
});
document.getElementById('input-hook-sub').addEventListener('input', (e) => {
  document.getElementById('preview-hook-sub').textContent = e.target.value;
});

// Real-time Text updates for Product Slides
document.getElementById('input-prod-title').addEventListener('input', (e) => {
  document.getElementById('preview-prod-title').textContent = e.target.value;
});
document.getElementById('input-prod-desc').addEventListener('input', (e) => {
  document.getElementById('preview-prod-desc').textContent = e.target.value;
});
document.getElementById('input-prod-cta').addEventListener('input', (e) => {
  document.getElementById('preview-prod-cta').textContent = e.target.value;
});

// Handle Image Uploads
document.getElementById('input-hook-bg').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      hookBgUrl = event.target.result;
      previewBg.src = hookBgUrl;
      previewBg.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('input-prod-img').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      prodImgUrl = event.target.result;
      previewBg.src = prodImgUrl;
      previewBg.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
});

// Download Canvas as high-res 3:4 PNG
document.getElementById('download-btn').addEventListener('click', () => {
  html2canvas(canvas, { scale: 2 }).then((cvs) => {
    const link = document.createElement('a');
    const isHook = !viewHook.classList.contains('hidden');
    link.download = isHook ? 'carousel-slide-1-portrait.png' : 'carousel-product-portrait.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
  });
});
