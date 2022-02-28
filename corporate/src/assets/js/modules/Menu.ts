export const Menu = () => {
  const bodyElem = document.body;
  const hamburgerBtn = <HTMLElement>document.querySelector('.js-menu');
  const logoElem = <HTMLElement>document.querySelector('.m-header-logo');
  const layer = document.createElement('div');
  const UA = window.navigator.userAgent.toLowerCase();
  const isIOS = UA.includes('iphone') || UA.includes('ipod') || UA.includes('ipad');
  console.log('isIOS:', isIOS);
  layer.classList.add('l-menu-layer');

  hamburgerBtn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    const hasLayer = document.querySelector('.l-menu-layer');
    if (isIOS) {
      const scrollPosition = window.pageYOffset;
      console.log('scrollPosition:', scrollPosition);
      if (hasLayer) {
        hamburgerBtn.classList.remove('is-open');
        logoElem.classList.remove('is-hide-logo');
        layer.classList.remove('is-layer-show');
        bodyElem.style.position = '';
        const backToScroll = parseInt(bodyElem.style.top) * -1;
        bodyElem.style.top = '';
        window.scrollTo(0, backToScroll);
        setTimeout(() => {
          hasLayer.remove();
        }, 400);
      } else {
        hamburgerBtn.classList.add('is-open');
        logoElem.classList.add('is-hide-logo');
        bodyElem.style.position = 'fixed';
        bodyElem.style.top = `-${scrollPosition}px`;
        bodyElem.appendChild(layer);
        setTimeout(() => {
          layer.classList.add('is-layer-show');
        }, 10);
      }
      return;
    }
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
