"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

var _TextField = _interopRequireDefault(require("../textfield/TextField"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextAreaComponent =
/*#__PURE__*/
function (_TextFieldComponent) {
  _inherits(TextAreaComponent, _TextFieldComponent);

  _createClass(TextAreaComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _TextField.default.schema.apply(_TextField.default, [{
        type: 'textarea',
        label: 'Text Area',
        key: 'textArea',
        rows: 3,
        wysiwyg: false,
        editor: ''
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Text Area',
        group: 'basic',
        icon: 'fa fa-font',
        documentation: 'http://help.form.io/userguide/#textarea',
        weight: 40,
        schema: TextAreaComponent.schema()
      };
    }
  }]);

  function TextAreaComponent(component, options, data) {
    var _this;

    _classCallCheck(this, TextAreaComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextAreaComponent).call(this, component, options, data)); // Never submit on enter for text areas.

    _this.options.submitOnEnter = false;
    return _this;
  }

  _createClass(TextAreaComponent, [{
    key: "setupValueElement",
    value: function setupValueElement(element) {
      var value = this.getValue();
      value = this.isEmpty(value) ? this.defaultViewOnlyValue : this.getView(value);

      if (this.component.wysiwyg) {
        value = this.interpolate(value);
      }

      element.innerHTML = value;
    }
  }, {
    key: "acePlaceholder",
    value: function acePlaceholder() {
      if (!this.component.placeholder || !this.editor) {
        return;
      }

      var shouldShow = !this.editor.session.getValue().length;
      var node = this.editor.renderer.emptyMessageNode;

      if (!shouldShow && node) {
        this.editor.renderer.scroller.removeChild(this.editor.renderer.emptyMessageNode);
        this.editor.renderer.emptyMessageNode = null;
      } else if (shouldShow && !node) {
        node = this.editor.renderer.emptyMessageNode = this.ce('div');
        node.textContent = this.t(this.component.placeholder);
        node.className = 'ace_invisible ace_emptyMessage';
        node.style.padding = '0 9px';
        this.editor.renderer.scroller.appendChild(node);
      }
    }
  }, {
    key: "createInput",
    value: function createInput(container) {
      var _this2 = this;

      if (this.isPlain) {
        if (this.options.readOnly) {
          this.input = this.ce('div', {
            class: 'well'
          });
          container.appendChild(this.input);
          return this.input;
        } else {
          return _get(_getPrototypeOf(TextAreaComponent.prototype), "createInput", this).call(this, container);
        }
      }

      if (this.htmlView) {
        this.input = this.ce('div', {
          class: 'well'
        });
        container.appendChild(this.input);
        return this.input;
      } // Add the input.


      this.input = this.ce('div', {
        class: 'formio-wysiwyg-editor'
      });
      container.appendChild(this.input);
      this.addCounter(container);

      if (this.component.editor === 'ace') {
        this.editorReady = _Formio.default.requireLibrary('ace', 'ace', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js', true).then(function () {
          var mode = _this2.component.as || 'javascript';
          _this2.editor = ace.edit(_this2.input);

          _this2.editor.on('change', function () {
            var newValue = _this2.getConvertedValue(_this2.editor.getValue()); // Do not bother to update if they are both empty.


            if (!_lodash.default.isEmpty(newValue) || !_lodash.default.isEmpty(_this2.dataValue)) {
              _this2.updateValue(null, newValue);
            }
          });

          _this2.editor.getSession().setTabSize(2);

          _this2.editor.getSession().setMode("ace/mode/".concat(mode));

          _this2.editor.on('input', function () {
            return _this2.acePlaceholder();
          });

          setTimeout(function () {
            return _this2.acePlaceholder();
          }, 100);
          return _this2.editor;
        });
        return this.input;
      } // Normalize the configurations.


      if (this.component.wysiwyg && this.component.wysiwyg.toolbarGroups) {
        console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
        this.component.wysiwyg = this.wysiwygDefault;
        this.emit('componentEdit', this);
      }

      if (!this.component.wysiwyg || typeof this.component.wysiwyg === 'boolean') {
        this.component.wysiwyg = this.wysiwygDefault;
        this.emit('componentEdit', this);
      } // Add the quill editor.


      this.editorReady = this.addQuill(this.input, this.component.wysiwyg, function () {
        _this2.updateValue(null, _this2.getConvertedValue(_this2.quill.root.innerHTML));
      }).then(function (quill) {
        quill.root.spellcheck = _this2.component.spellcheck;

        if (_this2.options.readOnly || _this2.component.disabled) {
          quill.disable();
        }

        return quill;
      }).catch(function (err) {
        return console.warn(err);
      });
      return this.input;
    }
  }, {
    key: "setConvertedValue",
    value: function setConvertedValue(value) {
      if (this.component.as && this.component.as === 'json' && value) {
        try {
          value = JSON.stringify(value, null, 2);
        } catch (err) {
          console.warn(err);
        }
      }

      return value;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      if (this.quill) {
        return !value || value === '<p><br></p>';
      } else {
        return _get(_getPrototypeOf(TextAreaComponent.prototype), "isEmpty", this).call(this, value);
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this3 = this;

      //should set value if new value is not equal to current
      var shouldSetValue = !_lodash.default.isEqual(value, this.getValue()); //should set value if is in read only mode

      shouldSetValue = shouldSetValue || this.options.readOnly;

      if (!shouldSetValue) {
        return;
      }

      value = value || '';

      if (this.isPlain) {
        if (this.options.readOnly) {
          // For readOnly, just view the contents.
          this.input.innerHTML = this.interpolate(value);
          this.dataValue = value;
          return;
        } else {
          return _get(_getPrototypeOf(TextAreaComponent.prototype), "setValue", this).call(this, this.setConvertedValue(value), flags);
        }
      } // Set the value when the editor is ready.


      this.dataValue = value;

      if (this.htmlView) {
        // For HTML view, just view the contents.
        this.input.innerHTML = this.interpolate(value);
      } else if (this.editorReady) {
        this.editorReady.then(function (editor) {
          if (_this3.component.editor === 'ace') {
            editor.setValue(_this3.setConvertedValue(value));
          } else {
            editor.setContents(editor.clipboard.convert(_this3.setConvertedValue(value)));

            _this3.updateValue(flags);
          }
        });
      }
    }
  }, {
    key: "getConvertedValue",
    value: function getConvertedValue(value) {
      if (this.component.as && this.component.as === 'json' && value) {
        try {
          value = JSON.parse(value);
        } catch (err) {
          console.warn(err);
        }
      }

      return value;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.viewOnly || this.htmlView || this.options.readOnly) {
        return this.dataValue;
      }

      if (this.isPlain) {
        return this.getConvertedValue(_get(_getPrototypeOf(TextAreaComponent.prototype), "getValue", this).call(this));
      }

      if (this.editor || this.quill) {
        return this.dataValue;
      }

      return this.component.multiple ? [] : '';
    }
  }, {
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(TextAreaComponent.prototype), "elementInfo", this).call(this);

      info.type = 'textarea';

      if (this.component.rows) {
        info.attr.rows = this.component.rows;
      }

      return info;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TextAreaComponent.schema();
    }
  }, {
    key: "isPlain",
    get: function get() {
      return !this.component.wysiwyg && !this.component.editor;
    }
  }, {
    key: "htmlView",
    get: function get() {
      return this.options.readOnly && this.component.wysiwyg;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = _get(_getPrototypeOf(TextAreaComponent.prototype), "defaultValue", this);

      if (this.component.wysiwyg && !defaultValue) {
        defaultValue = '<p><br></p>';
      }

      return defaultValue;
    }
  }]);

  return TextAreaComponent;
}(_TextField.default);

exports.default = TextAreaComponent;