(function () {
  const GRID_PX = 960;
  const DEFAULT_SIZE = 16;
  const MAX_SIZE = 100;

  const gridEl = document.getElementById('grid');
  const resizeBtn = document.getElementById('resize-btn');

  function clampSize(n) {
    if (Number.isNaN(n)) return DEFAULT_SIZE;
    return Math.min(MAX_SIZE, Math.max(1, Math.floor(n)));
  }

  const INK_COLOR = '#333333';

  function shadeSquare(square) {
    square.style.backgroundColor = INK_COLOR;
  }

  function buildGrid(side) {
    const size = clampSize(side);
    gridEl.replaceChildren();

    const cellPx = GRID_PX / size;

    for (let i = 0; i < size * size; i += 1) {
      const square = document.createElement('div');
      square.classList.add('grid-square');
      square.style.width = cellPx + 'px';
      square.style.height = cellPx + 'px';
      gridEl.appendChild(square);
    }

    gridEl.dataset.side = String(size);
  }

  gridEl.addEventListener(
    'mouseover',
    function (event) {
      const square = event.target.closest('.grid-square');
      if (!square || !gridEl.contains(square)) return;
      shadeSquare(square);
    },
    false
  );

  resizeBtn.addEventListener('click', function () {
    const raw = window.prompt(
      'How many squares per side? (max ' + MAX_SIZE + ')',
      gridEl.dataset.side || String(DEFAULT_SIZE)
    );
    if (raw === null) return;
    buildGrid(Number.parseInt(raw, 10));
  });

  buildGrid(DEFAULT_SIZE);
})();
