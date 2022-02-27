// import jsonDatas from '../../data/sample.json'; // jsonファイルだとコンパイル時エラーになる（動きはする）
// import { jsonDatas } from '../../data/sample.js'; // 引数での

export function apiLocal(jsonPath: any) {
  // 引数でのjsonインポートはIEではだめ

  // export function apiLocal() { // import文で行うならファイル内で対応する。

  /*
  // ローカルファイルの読み込み。fetchとimport。
  */
  // json読み込み（ローカル） IEはだめ。IE対策のためimportで読んだほうがいい
  async function jsonRead(jsonPath: any) {
    try {
      const res = await fetch(jsonPath);
      // console.log('res:', res);
      const data = await res.json();
      const target = <HTMLElement>document.querySelector('#json');
      Array.prototype.forEach.call(data, (elem, index) => {
        const div = document.createElement('div');
        const text = elem.word;
        div.style.textAlign = 'center';
        if (data.length - 1 === index) {
          div.innerHTML = 'IEではfecth、axiosでローカルファイルを読み込むとだめ';
          target.appendChild(div);
        } else {
          div.innerHTML = text;
          target.appendChild(div);
        }
      });
    } catch (error) {
      console.log('error:', error);
    }
  }
  jsonRead(jsonPath);

  // json読み込み（ローカルファイルをインポート）
  // const indertTargetElem = <HTMLElement>document.querySelector('#json');
  // Array.prototype.forEach.call(jsonDatas, (data, dataIndex) => {
  //   const creatDivElem = document.createElement('div');
  //   const jsonText = data.word;
  //   creatDivElem.style.textAlign = 'center';
  //   creatDivElem.innerHTML = jsonText;
  //   indertTargetElem.appendChild(creatDivElem);
  //   if (jsonDatas.length - 1 === dataIndex) {
  //     const creatLastDivElem = document.createElement('div');
  //     creatLastDivElem.style.textAlign = 'center';
  //     creatLastDivElem.innerText = 'IEではローカルファイをimportするといける';
  //     indertTargetElem.appendChild(creatLastDivElem);
  //   }
  // });
}
