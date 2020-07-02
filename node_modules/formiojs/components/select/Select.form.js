"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Base = _interopRequireDefault(require("../base/Base.form"));

var _SelectEdit = _interopRequireDefault(require("./editForm/Select.edit.data"));

var _SelectEdit2 = _interopRequireDefault(require("./editForm/Select.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base.default.apply(void 0, [[{
    key: 'data',
    components: _SelectEdit.default
  }, {
    key: 'validation',
    components: _SelectEdit2.default
  }]].concat(extend));
}