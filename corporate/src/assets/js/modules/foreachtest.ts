export function foreachtest() {
  /*
  // querySelectorAllのforEach
  */

  // querySelectorAllは配列だからforeachが使える。IEではpolyfill必要。
  // const imgQuery = document.querySelectorAll('img');
  // imgQuery.forEach((elemimgQuery) => {
  //   console.log('elemimgQuery:', elemimgQuery);
  // });

  /*
  // getElementsByTagNameのforEach
  */

  // getElementsByTagNameはHTMLCollectionなのでforeachは使えない
  let imgTagName: any = document.getElementsByTagName('img');

  // スプレッド構文で展開することでforeachが使える。IEではpolyfill必要。
  // [...imgTagName].forEach((elemimgTagName) => {
  //   console.log('elemimgTagName:', elemimgTagName);
  // });

  // arrayに変換してforechでも可能。IEではpolyfill必要。
  imgTagName = Array.from(imgTagName);
  imgTagName.forEach((elemimgTagName: any) => {
    elemimgTagName.addEventListener('click', (e: any) => {
      const self = e.currentTarget;
      console.log('self:', self);
    });
  });
}
