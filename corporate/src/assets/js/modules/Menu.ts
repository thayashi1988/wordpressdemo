export const Menu = () => {
  const bodyElem = document.body;
  const hamburgerBtn = <HTMLElement>document.querySelector('.js-menu');
  const headerElem = <HTMLElement>document.querySelector('.l-header');
  const navElem = <HTMLElement>document.querySelector('.l-nav');
  const logoElem = <HTMLElement>document.querySelector('.m-header-logo');
  const layer = document.createElement('div');
  const UA = window.navigator.userAgent.toLowerCase();
  const isIOS = UA.includes('iphone') || UA.includes('ipod') || UA.includes('ipad');
  layer.classList.add('l-menu-layer');

  hamburgerBtn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    const hasLayer = <HTMLElement>document.querySelector('.l-menu-layer');
    if (isIOS) {
      const scrollPosition = window.pageYOffset;
      if (hasLayer) {
        handleUnFixed(hasLayer);
        handleIOSUnFixed();
      } else {
        handleIsFixed();
        handleIOSIsFixed(scrollPosition);
      }
      return;
    }
    console.log('return');
    if (hasLayer) {
      handleUnFixed(hasLayer);
    } else {
      handleIsFixed(scrollbarWidth);
    }
  });

  const handleIsFixed = (scrollBarNum = 0): void => {
    hamburgerBtn.classList.add('is-open');
    headerElem.classList.add('is-transparent');
    logoElem.classList.add('is-hide-logo');
    bodyElem.classList.add('is-fixed');
    bodyElem.style.paddingRight = scrollBarNum ? `${scrollBarNum}px` : '';
    bodyElem.appendChild(layer);
    navElem.style.display = 'block';
    setTimeout(() => {
      layer.classList.add('is-layer-show');
    }, 10);
  };
  const handleUnFixed = (layerElement: HTMLElement): void => {
    hamburgerBtn.classList.remove('is-open');
    headerElem.classList.remove('is-transparent');
    logoElem.classList.remove('is-hide-logo');
    layer.classList.remove('is-layer-show');
    bodyElem.classList.remove('is-fixed');
    navElem.style.display = 'none';
    bodyElem.style.paddingRight = '';
    setTimeout(() => {
      layerElement.remove();
    }, 400);
  };

  const handleIOSIsFixed = (scrollNum: number): void => {
    bodyElem.style.position = 'fixed';
    bodyElem.style.top = `-${scrollNum}px`;
  };
  const handleIOSUnFixed = (): void => {
    bodyElem.style.position = '';
    const backToScroll = parseInt(bodyElem.style.top) * -1;
    bodyElem.style.top = '';
    window.scrollTo(0, backToScroll);
  };
};
