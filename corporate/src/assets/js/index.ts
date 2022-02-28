// npm plugins
// import $ from 'jquery'; // jquery
import smoothscroll from 'smoothscroll-polyfill'; // window.scrollToのbehavior: 'smooth'を効かすpolyfill
import 'intersection-observer'; // intersection-observerをimportし対応
// import axios from 'axios'; // IEでも使えるhttpクライアント
// import 'whatwg-fetch'; // fecthのIEpolyfill

// modules
import { Pagetop } from './modules/Pagetop';
import { HeaderScroll } from './modules/HeaderScroll';
import { Menu } from './modules/Menu';
// import { UA } from './modules/ua';
// import { foreachtest } from './modules/foreachtest';
// import { smoothScroll } from './modules/smoothscroll';
// import { countdowntimer } from './modules/countdowntimer';
// import { observer } from './modules/observer';
// import { apiAxios } from './modules/apiAxios';
// import { apiFetch } from './modules/apiFetch';
// import { apiLocal } from './modules/apiLocal';
// import { basic } from './modules/basic';

window.addEventListener('DOMContentLoaded', () => {
  smoothscroll.polyfill();
  Pagetop();
  HeaderScroll();
  Menu();

  // test($);
  // foreachtest();
  // smoothScroll();
  // countdowntimer();
  // observer();
  // apiAxios(axios);
  // apiFetch();
  // apiLocal('../assets/data/sample.json'); // モジュールで読み込みの場合
  // apiLocal(); // import文読み込みの場合
  // basic();

  // console.log('This is typescript!!!!!!!!!!!!!!');
});
