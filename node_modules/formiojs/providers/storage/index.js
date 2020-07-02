"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./base64"));

var _dropbox = _interopRequireDefault(require("./dropbox"));

var _s = _interopRequireDefault(require("./s3"));

var _url = _interopRequireDefault(require("./url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  base64: _base.default,
  dropbox: _dropbox.default,
  s3: _s.default,
  url: _url.default
};
exports.default = _default;