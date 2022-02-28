export const Menu = () => {
  const hamburgerBtn = <HTMLElement>document.querySelector('.js-menu');
  const logoElem = <HTMLElement>document.querySelector('.m-header-logo');
  const layer = document.createElement('div');
  layer.classList.add('l-menu-layer');

  hamburgerBtn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    const hasLayer = document.querySelector('.l-menu-layer');
    if (hasLayer) {
      hamburgerBtn.classList.remove('is-open');
      logoElem.classList.remove('is-hide-logo');
      layer.classList.remove('is-layer-show');
      setTimeout(() => {
        hasLayer.remove();
      }, 400);
    } else {
      hamburgerBtn.classList.add('is-open');
      logoElem.classList.add('is-hide-logo');
      document.body.appendChild(layer);
      setTimeout(() => {
        layer.classList.add('is-layer-show');
      }, 10);
    }
  });
};
