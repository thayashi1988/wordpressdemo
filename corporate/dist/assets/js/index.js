"use strict";

require("core-js/modules/es.regexp.exec.js");

var _jquery = _interopRequireDefault(require("jquery"));

var _smoothscrollPolyfill = _interopRequireDefault(require("smoothscroll-polyfill"));

require("intersection-observer");

var _axios = _interopRequireDefault(require("axios"));

require("whatwg-fetch");

var _test = require("./modules/test");

var _ua = require("./modules/ua");

var _foreachtest = require("./modules/foreachtest");

var _smoothscroll = require("./modules/smoothscroll");

var _countdowntimer = require("./modules/countdowntimer");

var _observer = require("./modules/observer");

var _apiAxios = require("./modules/apiAxios");

var _apiFetch = require("./modules/apiFetch");

var _apiLocal = require("./modules/apiLocal");

var _basic = require("./modules/basic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function () {
  _smoothscrollPolyfill.default.polyfill();

  (0, _test.test)(_jquery.default);
  (0, _ua.UA)();
  (0, _foreachtest.foreachtest)();
  (0, _smoothscroll.smoothScroll)();
  (0, _countdowntimer.countdowntimer)();
  (0, _observer.observer)();
  (0, _apiAxios.apiAxios)(_axios.default);
  (0, _apiFetch.apiFetch)();
  (0, _apiLocal.apiLocal)('../assets/data/sample.json');
  (0, _basic.basic)();
  console.log('This is typescript!!!!!!!!!!!!!!');
});