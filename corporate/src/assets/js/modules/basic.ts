export const basic = () => {
  // 現在時刻からの経過秒数を表示
  const oldTime = Date.now();
  setInterval(() => {
    const curentTime = Date.now();
    const diff = curentTime - oldTime;
    const seconds = Math.floor(diff / 1000);
    const elem = <HTMLParagraphElement>document.querySelector('.js-diff-time');
    elem.innerHTML = `${seconds}秒経過`;
  }, 1000);
  // console.log('basic:', basic);

  // requestAnimationFrame実装
  const raf = <HTMLParagraphElement>document.querySelector('.js-raf');
  raf.style.position = 'fiexd';
  raf.style.top = '0';
  raf.style.left = '0';

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  // document.body.addEventListener('mousemove', (e) => {
  //   mouseX = e.clientX;
  //   mouseY = e.clientY;
  // });
  // const tick = () => {
  //   requestAnimationFrame(tick);
  //   currentX = currentX + (mouseX - currentX) * 0.1;
  //   currentY = currentY + (mouseY - currentY) * 0.1;
  //   raf.style.transform = `translate(${currentX}px, ${currentY}px)`;
  // };
  // tick();

  function scrollFunction(id: any) {
    const scrollMenu = <HTMLElement>document.getElementById('scroll-menu');
    //タグの位置
    const selectedTag = <HTMLElement>document.getElementById(id);
    //　画面サイズータグの位置でスライドさせていますがここのロジックがわからないです

    const scrollCenter = scrollMenu.getBoundingClientRect().left + scrollMenu.getBoundingClientRect().width / 2;
    const tagCenter = selectedTag.getBoundingClientRect().left + selectedTag.getBoundingClientRect().width / 2;
    const tabWidth = scrollMenu.scrollLeft - (scrollCenter - tagCenter);
    console.log('scrollCenter:', scrollCenter);
    console.log('tagCenter:', tagCenter);
    console.log('tabWidth:', tabWidth);
    console.log('scrollMenu.scrollLeft:', scrollMenu.scrollLeft);

    // if (scrollMenu.scrollLeft <= tabWidth) {
    scrollMenu.scrollLeft = tabWidth;
    //   requestAnimationFrame(scrollFunction);
    // }
  }
  document.querySelectorAll('.scroll-menu-inner li').forEach((e) => {
    e.addEventListener('click', () => {
      console.log('e.getAttribute():', e.getAttribute('id'));
      scrollFunction(e.getAttribute('id'));
    });
  });
};
