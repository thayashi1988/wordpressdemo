export const Menu = () => {
  const bodyElem = document.body;
  const hamburgerBtn = <HTMLElement>document.querySelector('.js-menu');
  const logoElem = <HTMLElement>document.querySelector('.m-header-logo');
  const layer = document.createElement('div');
  layer.classList.add('l-menu-layer');

  hamburgerBtn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    const hasLayer = document.querySelector('.l-menu-layer');
    if (hasLayer) {
      hamburgerBtn.classList.remove('is-open');
      logoElem.classList.remove('is-hide-logo');
      layer.classList.remove('is-layer-show');
      bodyElem.classList.remove('is-fixed');
      bodyElem.style.paddingRight = '';
      setTimeout(() => {
        hasLayer.remove();
      }, 400);
    } else {
      hamburgerBtn.classList.add('is-open');
      logoElem.classList.add('is-hide-logo');
      bodyElem.classList.add('is-fixed');
      bodyElem.style.paddingRight = scrollbarWidth ? `${scrollbarWidth}px` : '';
      bodyElem.appendChild(layer);
      setTimeout(() => {
        layer.classList.add('is-layer-show');
      }, 10);
    }
  });
};
