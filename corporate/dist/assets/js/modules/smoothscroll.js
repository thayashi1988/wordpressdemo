"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoothScroll = smoothScroll;

function smoothScroll() {
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target.classList.contains('js-scroll')) return;
    e.preventDefault();
    var targetId = target.hash;
    var targetElement = document.querySelector(targetId);
    var rectTop = targetElement.getBoundingClientRect().top;
    var offsetTop = window.pageYOffset;
    var buffer = 0;
    var top = rectTop + offsetTop - buffer;
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  });
}