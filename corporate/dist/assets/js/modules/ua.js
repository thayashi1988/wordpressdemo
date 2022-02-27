"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UA = UA;

function UA() {
  var ua = window.navigator.userAgent.toLowerCase();
  console.log('お使いのUA!!!!!!:', ua);
}