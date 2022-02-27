"use strict";

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.regexp.exec.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = test;

function test($) {
  var aaa = $('.l-benefits');
  console.log('aaa:', aaa);
}