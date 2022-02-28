type IntersectionObserverEntry = {}[];

type IntersectionObserverEntryInit = {
  time?: number;
  rootBounds?: object;
  boundingClientRect?: object;
  intersectionRect?: object;
  isIntersecting?: Boolean;
  intersectionRatio?: number;
  target?: HTMLElement;
};

type IntersectionObserver = {
  delay?: null;
  root?: null | HTMLElement;
  rootMargin?: string;
  thresholds?: number[];
  trackVisibility?: Boolean;
};

export const HeaderScroll = () => {
  const mainvisualBodyElem = <HTMLElement>document.querySelector('.l-mainvisual-body');
  const headerElem = <HTMLElement>document.querySelector('.l-header');
  const pagetopElem = <HTMLElement>document.querySelector('.m-pagetop');

  const observerOptions = {
    root: null,
    rootMargin: `-70px 0px`, // ブラウザの上から70pxのバッファを取る
    threshold: 1, // 要素がブラウザの一番上に来たとき
  };

  const callback = (entries: IntersectionObserverEntry) => {
    entries.forEach((entry: IntersectionObserverEntryInit) => {
      if (!entry.isIntersecting) {
        headerElem.classList.remove('is-transparent');
        pagetopElem.classList.remove('is-hide');
      } else {
        headerElem.classList.add('is-transparent');
        pagetopElem.classList.add('is-hide');
      }
    });
  };
  const observer = new IntersectionObserver(callback, observerOptions);
  observer.observe(mainvisualBodyElem);

  // window.addEventListener('scroll', () => {
  //   const scrollVolume = window.pageYOffset;
  //   if (scrollVolume > headerHeight) {
  //     headerElem.classList.remove('is-transparent');
  //   } else {
  //     headerElem.classList.add('is-transparent');
  //   }
  // });
};
