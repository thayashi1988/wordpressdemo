export function observer() {
  /*
  // IntersectionObserverのターゲット取得
  */

  // IntersectionObserverのターゲット要素取得
  const targets: any = document.querySelectorAll('.l-section');

  // IntersectionObserverのターゲットを最初は非表示にし、下に50pxずらす
  targets.forEach((target: { style: { opacity: string; transition: string; transform: string } }) => {
    target.style.opacity = '0';
    target.style.transition = 'all 0.8s 0s ease';
    target.style.transform = 'translateY(50px)';
  });

  // IntersectionObserverのオプション
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.1, // 要素の10%が見えたらオブザーバー発動
  };

  // 要素が見えた際につけるクラス、スタイルの関数
  function addStyle(elem: HTMLElement) {
    elem.style.opacity = '1';
    elem.style.transform = 'translateY(0)';
  }

  // IntersectionObserverのコールバック関数
  function callback(entries: any) {
    entries.forEach((entry: any) => {
      const callbackTarget = entry.target; // observer.observe(target) した target を取得
      //ページスクロール量がフェードイン要素を超えているかの判定
      if (!(window.pageYOffset > callbackTarget.getBoundingClientRect().top + window.pageYOffset)) {
        // ページスクロール量がフェードイン要素を超えて要素が10%見えたら行う処理
        if (entry.isIntersecting) {
          addStyle(callbackTarget);
          // 一度だけ発火させる
          observer.unobserve(callbackTarget);
        }
      } else {
        addStyle(callbackTarget);
      }
    });
  }

  // IntersectionObserver インスタンスの生成
  const observer = new IntersectionObserver(callback, observerOptions);

  //IntersectionObserverを実行
  targets.forEach((elem: Element) => {
    observer.observe(elem);
  });
}
