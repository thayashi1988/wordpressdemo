"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.parse-int.js");

var Menu = function Menu() {
  var bodyElem = document.body;
  var hamburgerBtn = document.querySelector('.js-menu');
  var headerElem = document.querySelector('.l-header');
  var navElem = document.querySelector('.l-nav');
  var logoElem = document.querySelector('.m-header-logo');
  var layer = document.createElement('div');
  var UA = window.navigator.userAgent.toLowerCase();
  var isIOS = UA.includes('iphone') || UA.includes('ipod') || UA.includes('ipad');
  layer.classList.add('l-menu-layer');
  hamburgerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var scrollbarWidth = window.innerWidth - document.body.clientWidth;
    var hasLayer = document.querySelector('.l-menu-layer');

    if (isIOS) {
      var scrollPosition = window.pageYOffset;

      if (hasLayer) {
        handleUnFixed(hasLayer);
        handleIOSUnFixed();
      } else {
        handleIsFixed();
        handleIOSIsFixed(scrollPosition);
      }

      return;
    }

    console.log('return');

    if (hasLayer) {
      handleUnFixed(hasLayer);
    } else {
      handleIsFixed(scrollbarWidth);
    }
  });

  var handleIsFixed = function handleIsFixed(scrollBarNum) {
    if (scrollBarNum === void 0) {
      scrollBarNum = 0;
    }

    hamburgerBtn.classList.add('is-open');
    headerElem.classList.add('is-transparent');
    logoElem.classList.add('is-hide-logo');
    bodyElem.classList.add('is-fixed');
    bodyElem.style.paddingRight = scrollBarNum ? "".concat(scrollBarNum, "px") : '';
    bodyElem.appendChild(layer);
    setTimeout(function () {
      navElem.style.display = 'block';
      layer.classList.add('is-layer-show');
    }, 50);
  };

  var handleUnFixed = function handleUnFixed(layerElement) {
    hamburgerBtn.classList.remove('is-open');
    headerElem.classList.remove('is-transparent');
    logoElem.classList.remove('is-hide-logo');
    layer.classList.remove('is-layer-show');
    bodyElem.classList.remove('is-fixed');
    navElem.style.display = 'none';
    bodyElem.style.paddingRight = '';
    setTimeout(function () {
      layerElement.remove();
    }, 400);
  };

  var handleIOSIsFixed = function handleIOSIsFixed(scrollNum) {
    bodyElem.style.position = 'fixed';
    bodyElem.style.top = "-".concat(scrollNum, "px");
  };

  var handleIOSUnFixed = function handleIOSUnFixed() {
    bodyElem.style.position = '';
    var backToScroll = parseInt(bodyElem.style.top) * -1;
    bodyElem.style.top = '';
    window.scrollTo(0, backToScroll);
  };
};

exports.Menu = Menu;