"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _Stripe = _interopRequireDefault(require("./stripe/stripe/Stripe"));

var _StripeCheckout = _interopRequireDefault(require("./stripe/checkout/StripeCheckout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Contrib = {
  stripe: {
    stripe: _Stripe.default,
    checkout: _StripeCheckout.default
  }
};
var _default = Contrib;
exports.default = _default;

if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}