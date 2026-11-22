document.addEventListener('DOMContentLoaded', function () {
  /* ---------- DIAGRAM: выбор образца ---------- */
  const boxes = document.querySelectorAll('.box');
  const packedSample   = document.querySelector('.packed-dropper-sample');
  const unpackedSample = document.querySelector('.unpacked-dropper-sample');

  let selectedBox = document.querySelector('.box-top');
  let selectedSample = packedSample;

  if (selectedBox) {
    selectedBox.classList.add('selected');
    selectedBox.classList.remove('deselected');
  }
  if (packedSample) {
    packedSample.classList.add('enabled');
  }

  function showSample(target) {
    if (!target || target === selectedSample) return;
    if (selectedSample) selectedSample.classList.remove('enabled');
    target.classList.add('enabled');
    selectedSample = target;
  }

  boxes.forEach(box => {
    box.addEventListener('click', function (e) {
      if (e.target.closest('.tooltip')) return; // клик по тултипу — игнор

      const subEl = box.querySelector('.box-sub');
      const subtitle = subEl ? subEl.textContent : '';

      if (subtitle.includes('[FILE #1]')) {
        showSample(packedSample);
      } else if (subtitle.includes('[FILE #2]')) {
        showSample(unpackedSample);
      } else {
        // FILE #3 / #4 / прочее — скрываем обе панели
        if (selectedSample) selectedSample.classList.remove('enabled');
        selectedSample = null;
      }

      // Переключение выделения
      if (selectedBox && selectedBox !== this) {
        selectedBox.classList.remove('selected');
        selectedBox.classList.add('deselected');
        const prev = selectedBox;
        setTimeout(() => prev.classList.remove('deselected'), 400);
      }

      this.classList.add('selected');
      this.classList.remove('deselected');
      selectedBox = this;
    });
  });

  /* ---------- DIE: зум по клику ---------- */
  const dieBox = document.querySelectorAll('.die-image1');
  if (dieBox) {
    dieBox.forEach(box => {
      box.addEventListener('click', () => box.classList.toggle('unzoomed'));
    });
  }

  /* ---------- TABS: CSS-only, JS не нужен ---------- */
  // Вкладки Static Analysis работают на radio + :has(), см. HTML/CSS.
  // JS здесь намеренно отсутствует.
});