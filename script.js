const canvas = document.getElementById('layout-canvas');
const presetBtns = document.querySelectorAll('.preset-btn');
const bgSelect = document.getElementById('bg-style-select');

// Image Elements
const prev1 = document.getElementById('prev-img-1');
const prev2 = document.getElementById('prev-img-2');
const prev3 = document.getElementById('prev-img-3');
const prev4 = document.getElementById('prev-img-4');

// File Upload Listeners
document.getElementById('img-input-1').addEventListener('change', (e) => loadImg(e, prev1));
document.getElementById('img-input-2').addEventListener('change', (e) => loadImg(e, prev2));
document.getElementById('img-input-3').addEventListener('change', (e) => loadImg(e, prev3));

function loadImg(event, targetElement) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => { 
      targetElement.src = e.target.result;
      // Mirror image to photo 4 if in 4-grid mode and photo 4 is empty
      if (targetElement === prev3) prev4.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Layout Switcher
presetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    presetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const layoutStyle = btn.dataset.layout;
    const currentBg = bgSelect.value;
    canvas.className = `layout-canvas ${layoutStyle} ${currentBg}`;
  });
});

// Background Style Switcher
bgSelect.addEventListener('change', (e) => {
  const activeLayout = document.querySelector('.preset-btn.active').dataset.layout;
  canvas.className = `layout-canvas ${activeLayout} ${e.target.value}`;
});

// Accent Color Picker
document.getElementById('accent-color').addEventListener('input', (e) => {
  const color = e.target.value;
  document.querySelectorAll('.preset-btn.active').forEach(b => b.style.backgroundColor = color);
  document.querySelectorAll('.offset-overlap .box-2, .diagonal-geo .box-2').forEach(box => {
    box.style.borderColor = color;
  });
});

// Toggle Carousel Bottom Safe Zone Overlay
document.getElementById('toggle-safezone').addEventListener('change', (e) => {
  document.getElementById('safezone-mask').classList.toggle('hidden', !e.target.checked);
});

// Download Designed Canvas as High-Res PNG
document.getElementById('download-btn').addEventListener('click', () => {
  // Hide border dashes during export
  const mask = document.getElementById('safezone-mask');
  mask.style.borderTop = 'none';

  html2canvas(canvas, { scale: 2 }).then((cvs) => {
    const link = document.createElement('a');
    link.download = '3d-model-designed-slide.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
    mask.style.borderTop = '1px dashed rgba(255, 94, 0, 0.5)';
  });
});
