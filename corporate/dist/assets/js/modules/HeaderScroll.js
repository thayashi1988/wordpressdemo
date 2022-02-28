"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderScroll = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

var HeaderScroll = function HeaderScroll() {
  var mainvisualBodyElem = document.querySelector('.l-mainvisual-body');
  var headerElem = document.querySelector('.l-header');
  var pagetopElem = document.querySelector('.m-pagetop');
  var observerOptions = {
    root: null,
    rootMargin: "-70px 0px",
    threshold: 1
  };

  var callback = function callback(entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        headerElem.classList.remove('is-transparent');
        pagetopElem.classList.remove('is-hide');
      } else {
        headerElem.classList.add('is-transparent');
        pagetopElem.classList.add('is-hide');
      }
    });
  };

  var observer = new IntersectionObserver(callback, observerOptions);
  observer.observe(mainvisualBodyElem);
};

exports.HeaderScroll = HeaderScroll;