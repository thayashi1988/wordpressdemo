// import Swiper JS
// import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
// Swiper.use([Navigation, Pagination, Scrollbar]);
// import Swiper styles
// import 'swiper/css';

export const TheSwiper = () => {
  const options = {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 1,
    resizeReInit: true,
    grabCursor: true,
    // autoHeight: true,
    // calculateHeight: true,
    pagination: {
      el: '.js-swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  console.log('options:', options);
  /* @ts-ignore */
  const swiper = new Swiper('.swiper', options);
};
