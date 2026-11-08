const canvas = document.getElementById('layout-canvas');
const presetBtns = document.querySelectorAll('.preset-btn');

// Image Elements
const prev1 = document.getElementById('prev-img-1');
const prev2 = document.getElementById('prev-img-2');
const prev3 = document.getElementById('prev-img-3');

// File Upload Listeners
document.getElementById('img-input-1').addEventListener('change', (e) => loadImg(e, prev1));
document.getElementById('img-input-2').addEventListener('change', (e) => loadImg(e, prev2));
document.getElementById('img-input-3').addEventListener('change', (e) => loadImg(e, prev3));

function loadImg(event, targetElement) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => { targetElement.src = e.target.result; };
    reader.readAsDataURL(file);
  }
}

// Layout Generator Switcher
presetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    presetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const layoutStyle = btn.dataset.layout;
    canvas.className = `layout-canvas ${layoutStyle}`;
  });
});

// Gap Adjustment Slider
document.getElementById('gap-slider').addEventListener('input', (e) => {
  canvas.style.gap = `${e.target.value}px`;
  canvas.style.padding = `${e.target.value}px`;
});

// Accent Color Picker (Updates Inset Borders & Badges)
document.getElementById('accent-color').addEventListener('input', (e) => {
  const color = e.target.value;
  document.getElementById('watermark-badge').style.backgroundColor = color;
  document.querySelectorAll('.spotlight .box-2, .spotlight .box-3').forEach(box => {
    box.style.borderColor = color;
  });
});

// Toggle Watermark Badge
document.getElementById('toggle-watermark').addEventListener('change', (e) => {
  document.getElementById('watermark-badge').classList.toggle('hidden', !e.target.checked);
});

// Download Canvas as High-Res PNG
document.getElementById('download-btn').addEventListener('click', () => {
  html2canvas(canvas, { scale: 2 }).then((cvs) => {
    const link = document.createElement('a');
    link.download = '3d-print-photo-layout.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
  });
});
