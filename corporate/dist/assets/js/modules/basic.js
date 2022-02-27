"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basic = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

var basic = function basic() {
  var oldTime = Date.now();
  setInterval(function () {
    var curentTime = Date.now();
    var diff = curentTime - oldTime;
    var seconds = Math.floor(diff / 1000);
    var elem = document.querySelector('.js-diff-time');
    elem.innerHTML = "".concat(seconds, "\u79D2\u7D4C\u904E");
  }, 1000);
  var raf = document.querySelector('.js-raf');
  raf.style.position = 'fiexd';
  raf.style.top = '0';
  raf.style.left = '0';
  var mouseX = 0;
  var mouseY = 0;
  var currentX = 0;
  var currentY = 0;

  function scrollFunction(id) {
    var scrollMenu = document.getElementById('scroll-menu');
    var selectedTag = document.getElementById(id);
    var scrollCenter = scrollMenu.getBoundingClientRect().left + scrollMenu.getBoundingClientRect().width / 2;
    var tagCenter = selectedTag.getBoundingClientRect().left + selectedTag.getBoundingClientRect().width / 2;
    var tabWidth = scrollMenu.scrollLeft - (scrollCenter - tagCenter);
    console.log('scrollCenter:', scrollCenter);
    console.log('tagCenter:', tagCenter);
    console.log('tabWidth:', tabWidth);
    console.log('scrollMenu.scrollLeft:', scrollMenu.scrollLeft);
    scrollMenu.scrollLeft = tabWidth;
  }

  document.querySelectorAll('.scroll-menu-inner li').forEach(function (e) {
    e.addEventListener('click', function () {
      console.log('e.getAttribute():', e.getAttribute('id'));
      scrollFunction(e.getAttribute('id'));
    });
  });
};

exports.basic = basic;