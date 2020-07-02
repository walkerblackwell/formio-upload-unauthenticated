"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ContentComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ContentComponent, _BaseComponent);

  function ContentComponent() {
    _classCallCheck(this, ContentComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContentComponent).apply(this, arguments));
  }

  _createClass(ContentComponent, [{
    key: "setHTML",
    value: function setHTML() {
      this.htmlElement.innerHTML = this.interpolate(this.component.html);
    }
  }, {
    key: "build",
    value: function build() {
      var _this = this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _state$quill = state.quill,
          quill = _state$quill === void 0 ? {} : _state$quill;
      this.createElement();
      this.htmlElement = this.ce('div', {
        id: this.id,
        class: "form-group ".concat(this.component.className)
      });
      this.htmlElement.component = this;

      if (this.options.builder) {
        var editorElement = this.ce('div');
        this.element.appendChild(editorElement);
        this.addQuill(editorElement, this.wysiwygDefault, function (element) {
          _this.component.html = element.value;
        }).then(function (editor) {
          var contents = quill.contents;

          if (_lodash.default.isString(contents)) {
            try {
              contents = JSON.parse(contents);
            } catch (err) {
              console.warn(err);
            }
          }

          if (_lodash.default.isObject(contents)) {
            editor.setContents(contents);
          } else {
            editor.clipboard.dangerouslyPasteHTML(_this.component.html);
          }
        }).catch(function (err) {
          return console.warn(err);
        });
      } else {
        this.setHTML();

        if (this.component.refreshOnChange) {
          this.on('change', function () {
            return _this.setHTML();
          }, true);
        }
      }

      this.element.appendChild(this.htmlElement);
      this.attachLogic();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var state = _get(_getPrototypeOf(ContentComponent.prototype), "destroy", this).call(this);

      if (this.quill) {
        try {
          state.quill = {
            contents: JSON.stringify(this.quill.getContents())
          };
        } catch (err) {
          console.warn(err);
        }
      }

      return state;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return ContentComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
        label: 'Content',
        type: 'content',
        key: 'content',
        input: false,
        html: ''
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Content',
        group: 'basic',
        icon: 'fa fa-html5',
        documentation: 'http://help.form.io/userguide/#content-component',
        weight: 100,
        schema: ContentComponent.schema()
      };
    }
  }]);

  return ContentComponent;
}(_Base.default);

exports.default = ContentComponent;