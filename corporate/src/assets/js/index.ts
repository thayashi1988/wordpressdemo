// npm plugins
import smoothscroll from 'smoothscroll-polyfill'; // window.scrollToのbehavior: 'smooth'を効かすpolyfill
import 'intersection-observer'; // intersection-observerをimportし対応

// modules
import { Pagetop } from './modules/Pagetop';
import { HeaderScroll } from './modules/HeaderScroll';
import { Menu } from './modules/Menu';
import { TheSwiper } from './modules/TheSwiper';
import { Form } from './modules/Form';

window.addEventListener('DOMContentLoaded', () => {
  smoothscroll.polyfill();
  Pagetop();
  HeaderScroll();
  Menu();
  TheSwiper();
  Form();
  // console.log('This is typescript!!!!!!!!!!!!!!');
});
