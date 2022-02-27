let count = 0;
chrome.action.onClicked.addListener(function (tab) {
  count++;
  chrome.tabs.sendMessage(
    tab.id,
    {
      count: count,
    },
    function (msg) {}
  );
});

window.addEventListener('load', () => {
  // ページ内のimg要素を取得
  const siteAllimgs = document.querySelectorAll('img');
  // console.log('ページ内のimg要素:', siteAllimgs);

  // ページのURLを取得
  const pageUrl = location.href;
  const pageProtocol = location.protocol;
  const pageHost = location.hostname;
  const TheUrl = `${pageProtocol}//${pageHost}/`;

  // 画像パスをルート相対にする関数
  const getRootRelative = function (path, excludeQueryString, excludeHashFragment) {
    if (!path || !path.match(/(^\/|\/\/)/)) return '';
    let rootImgPath = path.replace(/\\/g, '/').replace(/^[^/]*\/\/[^/]*/, '');
    if (excludeQueryString) rootImgPath = rootImgPath.replace(/\?([^#]+)?/, '');
    if (excludeHashFragment) rootImgPath = rootImgPath.replace(/\#.*?$/, '');
    return rootImgPath;
  };

  // ファイルサイズをバイト数単位に変換する関数
  function niceBytes(x) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0,
      n = parseInt(x, 10) || 0;
    if (n === 1) return '1 byte';

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }

  // 画像のファイルサイズを取得する関数
  let imgFileSizeArray = [];
  async function getImgFileSize(imgFilePath, imgFilePathNum) {
    // const urlString = imgFilePath;
    // console.log('getRootRelative(imgFilePath):', getRootRelative(imgFilePath));
    if (imgFilePath.indexOf(TheUrl) !== -1) {
      const res = await fetch(getRootRelative(imgFilePath))
        .then((response) => {
          // console.log(imgFilePathNum + ':', response.headers.get('Content-Length'));
          return response.headers.get('Content-Length');
        })
        .then((fileSize) => {
          imgFileSizeArray.push({
            num: imgFilePathNum,
            size: niceBytes(fileSize),
          });
        })
        .catch((error) => {
          console.log('失敗しました');
        });
    } else {
      imgFileSizeArray.push({
        num: imgFilePathNum,
        size: '外部ページなのでサイズは取得できません。',
      });
    }
  }

  // img要素に対してファイルサイズの取得を実施
  function runGetImgFileSize(imgElems) {
    imgElems.forEach((elem, index) => {
      getImgFileSize(elem.src, index);
    });
  }
  runGetImgFileSize(siteAllimgs);
  console.log('画像のファイルサイズ:', imgFileSizeArray);

  // 画像の各データをオブジェクトに追加する関数
  let imgDatasArray = [];
  function imgDatasPushing(cW, iW, iH, iA) {
    imgDatasArray.push({
      imgClientWidth: cW,
      imgInitialWidth: iW,
      imgInitialHeight: iH,
      imgAttrs: iA,
    });
  }

  // 表示させるテキストとそのスタイル
  let insertChildHTML = '';
  let insertParentHTML = '';
  const styleChild = `font-size: 12px;` + `color: #fff;` + `width: 100%;` + `margin-top: 5px;` + `word-break: break-all;`;
  let styleParent = [];

  // 画像の各データを取得する関数
  function getImgDatas() {
    let windowScroll = window.pageYOffset;

    siteAllimgs.forEach((elemImg, index) => {
      elemImg.classList.add(`js-showImageDetails${index}`);
      let styles =
        `position: absolute;` +
        `display: flex; flex-direction: column;` +
        `min-width: 200px;` +
        `top:${elemImg.getBoundingClientRect().top + windowScroll + 30}px;` +
        `left: ${elemImg.getBoundingClientRect().left}px;` +
        `background-color: rgba(100,100,100,.8);` +
        `padding: 10px;` +
        `z-index: 9999999;`;

      styleParent.push(styles);
      imgDatasPushing(elemImg.clientWidth, elemImg.naturalWidth, elemImg.naturalHeight, elemImg.attributes);
    });
  }

  // 画像の各データをテキストで表示する関数
  function showImgDatas(fileSizees) {
    imgDatasArray.forEach((elemAttr, index) => {
      insertChildHTML =
        `<span style="${styleChild} color:#1d22a0;">ID：js-showImageDetails${index}</span>` +
        `<span style="${styleChild}">オリジナルの幅と高さ：${elemAttr.imgInitialWidth}px×${elemAttr.imgInitialHeight}px</span>` +
        `<span style="${styleChild}">表示している画像の幅：${elemAttr.imgClientWidth}px</span>`;
      if (fileSizees[index].size.indexOf('MB') !== -1) {
        insertChildHTML += `<span style="${styleChild}">画像ファイルサイズ：約&nbsp;<span style="color: #1D22A0;">${fileSizees[index].size}</span></span>`;
      } else {
        insertChildHTML += `<span style="${styleChild}">画像ファイルサイズ：${fileSizees[index].size}</span>`;
      }
      for (let i = 0; i < elemAttr.imgAttrs.length; i++) {
        insertChildHTML += `<span style="${styleChild};">${elemAttr.imgAttrs[i].name}属性：${elemAttr.imgAttrs[i].value}</span>`;
      }
      insertParentHTML = `<div style="${styleParent[index]}" class="js-showImageDetails" id="js-showImageDetails${index}">` + `${insertChildHTML}` + `</div>`;

      let divElement = document.createElement('div');
      divElement.innerHTML = insertParentHTML;
      let divElementChildNodes = divElement.childNodes[0];
      document.body.appendChild(divElementChildNodes);
    });
  }

  // 画像の各データのテキストを非表示
  function hideImgDatas() {
    const imgDatas = document.querySelectorAll('.js-showImageDetails');
    imgDatas.forEach((elem) => {
      elem.remove();
    });
    imgDatasArray = [];
    styleParent = [];
    insertChildHTML = '';
    insertParentHTML = '';
  }

  // ホバーした際に、ホバー以外のテキストを非表示にして、ホバーしているものに枠線をつける関数
  let hoverTimer = null;
  // let flag = false;
  function imgHoverAction(targetElem, targetElems, targetId) {
    // if (!flag) {
    // clearTimeout(hoverTimer);
    // flag = false;
    // requestAnimationFrame(function () {
    // });
    // hoverTimer = setTimeout(() => {
    // console.log('hoverTimer:', hoverTimer);
    targetElem.style.opacity = '1';
    targetElem.style.border = '3px solid rgba(29,34,160,1)';
    targetElems.forEach((elem, index) => {
      const anotherId = elem.getAttribute('id');
      if (targetId !== anotherId) {
        elem.style.opacity = '0';
      }
    });
    // }, 400);
    // flag = true;
  }

  // ホバー時画像の枠線をトグルするスタイル関数
  let enterSelfId = '';
  function imgHoverActionStyles(self, hoverEnet = 'enter') {
    enterSelfId = self.getAttribute('id');
    const enterTargetImg = document.querySelector(`.${enterSelfId}`);
    if (hoverEnet === 'enter') {
      enterTargetImg.style.border = '3px solid rgba(29,34,160,1)';
      enterTargetImg.style.boxShadow = 'rgb(29 34 160 / 80%) 0 0 12px 2px';
    } else {
      enterTargetImg.style.border = 'none';
      enterTargetImg.style.boxShadow = 'none';
    }
  }

  // aaa.jsからの情報を取得
  chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // sendResponseでaaa.jsにレスポンスを返さないとエラーになる。レスポンスは空でもOK
    // sendResponse({ aaa: 'aaaaa' });
    sendResponse();
    console.log('msg.count:', msg.count);
    // aaa.jsからの情報は、第一引数に格納されるのでそれを利用する
    if (msg.count % 2 !== 0) {
      imgFileSizeArray.sort(function (a, b) {
        if (a.num < b.num) {
          return -1;
        } else {
          return 1;
        }
      });
      getImgDatas();
      showImgDatas(imgFileSizeArray);
      const imgDetails = Array.from(document.querySelectorAll('.js-showImageDetails'));
      imgDetails.forEach((target) => {
        target.addEventListener(
          'mouseenter',
          (e) => {
            const enterSlef = e.currentTarget;
            imgHoverActionStyles(enterSlef);
            imgHoverAction(enterSlef, imgDetails, enterSelfId);
          },
          { passive: true }
        );

        target.addEventListener(
          'mouseleave',
          (e) => {
            const leaveSlef = e.currentTarget;
            imgHoverActionStyles(leaveSlef, 'leave');
            target.style.border = 'none';
            imgDetails.forEach((elem) => {
              elem.style.opacity = '1';
            });
          },
          { passive: true }
        );
      });
      // console.log('ページ内のimg要素:', siteAllimgs);
      // console.log('画像の各データ:', imgDatasArray);
    } else {
      hideImgDatas();
    }
  });
});
