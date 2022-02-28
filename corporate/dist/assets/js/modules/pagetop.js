"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagetop = void 0;

var Pagetop = function Pagetop() {
  var pageTopElem = document.querySelector('.js-pagetop');
  pageTopElem.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

exports.Pagetop = Pagetop;