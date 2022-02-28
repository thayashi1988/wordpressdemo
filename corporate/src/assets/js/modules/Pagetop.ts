export const Pagetop = () => {
  const pageTopElem = <HTMLElement>document.querySelector('.js-pagetop');
  pageTopElem.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};
