export function smoothScroll() {
  /*
  // 素のJSでスムーススクロール。IEではpolyfill必要。
  */

  // jsでのスムーススクロール
  document.addEventListener('click', (e) => {
    const target: any = e.target;
    // clickした要素がclass属性、js-smooth-scrollを含まない場合は処理を中断
    if (!target.classList.contains('js-scroll')) return;
    e.preventDefault();
    const targetId = target.hash;
    const targetElement = document.querySelector(targetId);
    // 画面上部から要素までの距離
    const rectTop = targetElement.getBoundingClientRect().top;
    // 現在のスクロール距離
    const offsetTop = window.pageYOffset;
    // スクロール位置に持たせるバッファ
    const buffer = 0;
    const top = rectTop + offsetTop - buffer;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  });
}
