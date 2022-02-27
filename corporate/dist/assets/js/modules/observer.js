"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observer = observer;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

function observer() {
  var targets = document.querySelectorAll('.l-section');
  targets.forEach(function (target) {
    target.style.opacity = '0';
    target.style.transition = 'all 0.8s 0s ease';
    target.style.transform = 'translateY(50px)';
  });
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.1
  };

  function addStyle(elem) {
    elem.style.opacity = '1';
    elem.style.transform = 'translateY(0)';
  }

  function callback(entries) {
    entries.forEach(function (entry) {
      var callbackTarget = entry.target;

      if (!(window.pageYOffset > callbackTarget.getBoundingClientRect().top + window.pageYOffset)) {
        if (entry.isIntersecting) {
          addStyle(callbackTarget);
          observer.unobserve(callbackTarget);
        }
      } else {
        addStyle(callbackTarget);
      }
    });
  }

  var observer = new IntersectionObserver(callback, observerOptions);
  targets.forEach(function (elem) {
    observer.observe(elem);
  });
}