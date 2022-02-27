"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countdowntimer = countdowntimer;

require("core-js/modules/es.array.slice.js");

function countdowntimer() {
  var endDate = new Date('2021-03-27T00:00:00');
  var interval = 1000;

  function countdownTimer() {
    var nowDate = new Date();
    var period = endDate - nowDate;

    var addZero = function addZero(n) {
      return ('0' + n).slice(-2);
    };

    if (period >= 0) {
      var hour = Math.floor(period / (1000 * 60 * 60));
      period -= hour * (1000 * 60 * 60);
      var minutes = Math.floor(period / (1000 * 60));
      period -= minutes * (1000 * 60);
      var second = Math.floor(period / 1000);
      var insert = '';
      insert += "<span style=\"font-size: 30px\">".concat(hour, ":<span>");
      insert += "<span style=\"font-size: 30px\">".concat(addZero(minutes), ":<span>");
      insert += "<span style=\"font-size: 30px\">".concat(addZero(second), "<span>");
      var targetElem = document.querySelector('#timer');
      targetElem.style.textAlign = 'center';
      targetElem.innerHTML = insert;
      setTimeout(countdownTimer, 1000);
    } else {
      var insert = '';
      var text = 'Finish';
      insert += "<span>".concat(text, "<span>");
      var targetElem = document.querySelector('#timer');
      targetElem.innerHTML = insert;
    }
  }

  countdownTimer();
}