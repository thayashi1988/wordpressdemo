export function countdowntimer() {
  /*
  // カウントダウンタイマー
  */

  // var endDate: any = new Date(); // 現在時刻を取得
  let endDate: any = new Date('2021-03-27T00:00:00'); // カウントダウンの終了時刻
  // endDate.setDate(endDate.getDate() + 1); // カウントダウン終了時刻をページを開いた1日後
  const interval = 1000;

  function countdownTimer(): void {
    const nowDate: any = new Date(); // 現在時刻を取得
    let period = endDate - nowDate; // endDateからnowDateを引いて目標時刻までの差分を取得
    const addZero = function (n: string | number) {
      // console.log('0' + n);
      return ('0' + n).slice(-2); // 分と秒が一桁になったときに「0」をつける
    };

    if (period >= 0) {
      const hour = Math.floor(period / (1000 * 60 * 60)); // periodをそれぞれの単位に合わせる
      period -= hour * (1000 * 60 * 60);
      const minutes = Math.floor(period / (1000 * 60));
      period -= minutes * (1000 * 60);
      const second = Math.floor(period / 1000);

      let insert: string = '';
      insert += `<span style="font-size: 30px">${hour}:<span>`; // spanをつけてinsertに入れてく
      insert += `<span style="font-size: 30px">${addZero(minutes)}:<span>`;
      insert += `<span style="font-size: 30px">${addZero(second)}<span>`;

      let targetElem = <HTMLElement>document.querySelector('#timer');
      targetElem.style.textAlign = 'center';
      targetElem.innerHTML = insert; // #timerの中に表示
      setTimeout(countdownTimer, 1000); // setTimeout()でcountdownTimerを呼び出す
    } else {
      let insert: string = '';
      const text: string = 'Finish';
      insert += `<span>${text}<span>`;

      let targetElem = <HTMLElement>document.querySelector('#timer');
      targetElem.innerHTML = insert; //「Finish」を表示
    }
  }
  countdownTimer();
}
