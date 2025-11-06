(function () {
  'use strict';

  const button = document.getElementById('previewBtn');
  const collageImages = Array.from(document.querySelectorAll('#collage-layer .collage'));
  let showing = false;
  let timer = null;

  button.addEventListener('click', function () {
    if (!showing) {
      showing = true;
      button.textContent = 'Hide collage preview';
      collageImages.forEach(img => img.classList.add('hidden'));
      let index = 0;
      timer = setInterval(function () {
        if (index >= collageImages.length) {
          clearInterval(timer);
          timer = null;
          return;
        }
        collageImages[index].classList.remove('hidden');
        index++;
      }, 400);
    } else {
      showing = false;
      button.textContent = 'Show collage preview';
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      collageImages.forEach(img => img.classList.add('hidden'));
    }
  });
})();
