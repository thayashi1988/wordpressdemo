"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foreachtest = foreachtest;

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

function foreachtest() {
  var imgTagName = document.getElementsByTagName('img');
  imgTagName = Array.from(imgTagName);
  imgTagName.forEach(function (elemimgTagName) {
    elemimgTagName.addEventListener('click', function (e) {
      var self = e.currentTarget;
      console.log('self:', self);
    });
  });
}