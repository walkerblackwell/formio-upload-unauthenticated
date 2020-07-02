"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.regexp.split");

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _utils = require("../../utils/utils");

var _Formio = _interopRequireDefault(require("../../Formio"));

var _Form = _interopRequireDefault(require("../../Form"));

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

var FormComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(FormComponent, _BaseComponent);

  _createClass(FormComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
        type: 'form',
        key: 'form',
        src: '',
        reference: true,
        form: '',
        path: ''
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Nested Form',
        icon: 'fa fa-wpforms',
        group: 'advanced',
        documentation: 'http://help.form.io/userguide/#form',
        weight: 110,
        schema: FormComponent.schema()
      };
    }
  }]);

  function FormComponent(component, options, data) {
    var _this;

    _classCallCheck(this, FormComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormComponent).call(this, component, options, data));
    _this.subForm = null;
    _this.formSrc = '';
    _this.subFormReady = new _nativePromiseOnly.default(function (resolve, reject) {
      _this.subFormReadyResolve = resolve;
      _this.subFormReadyReject = reject;
    });
    return _this;
  }

  _createClass(FormComponent, [{
    key: "destroy",
    value: function destroy() {
      var state = _get(_getPrototypeOf(FormComponent.prototype), "destroy", this).call(this) || {};

      if (this.subForm) {
        this.subForm.destroy();
      }

      return state;
    }
    /**
     * Render a subform.
     *
     * @param form
     * @param options
     */

  }, {
    key: "renderSubForm",
    value: function renderSubForm(form, options) {
      var _this2 = this;

      // Iterate through every component and hide the submit button.
      (0, _utils.eachComponent)(form.components, function (component) {
        if (component.type === 'button' && component.action === 'submit') {
          component.hidden = true;
        }
      });
      new _Form.default(this.element, form, options).render().then(function (instance) {
        _this2.subForm = instance;

        _this2.subForm.on('change', function () {
          _this2.dataValue = _this2.subForm.getValue();

          _this2.onChange();
        });

        _this2.subForm.url = _this2.formSrc;
        _this2.subForm.nosubmit = false;

        _this2.restoreValue();

        _this2.subFormReadyResolve(_this2.subForm);

        return _this2.subForm;
      });
    }
    /**
     * Load the subform.
     */

    /* eslint-disable max-statements */

  }, {
    key: "loadSubForm",
    value: function loadSubForm() {
      var _this3 = this;

      // Only load the subform if the subform isn't loaded and the conditions apply.
      if (this.subFormLoaded) {
        return this.subFormReady;
      }

      this.subFormLoaded = true;
      var srcOptions = {};

      if (this.options && this.options.base) {
        srcOptions.base = this.options.base;
      }

      if (this.options && this.options.project) {
        srcOptions.project = this.options.project;
      }

      if (this.options && this.options.readOnly) {
        srcOptions.readOnly = this.options.readOnly;
      }

      if (this.options && this.options.icons) {
        srcOptions.icons = this.options.icons;
      }

      if (this.options && this.options.viewAsHtml) {
        srcOptions.viewAsHtml = this.options.viewAsHtml;
      } // Make sure that if reference is provided, the form must submit.


      if (this.component.reference) {
        this.component.submit = true;
      }

      if (this.component.src) {
        this.formSrc = this.component.src;
      }

      if (!this.component.src && !this.options.formio && (this.component.form || this.component.path)) {
        this.formSrc = _Formio.default.getBaseUrl();

        if (this.component.project) {
          // Check to see if it is a MongoID.
          if ((0, _utils.isMongoId)(this.component.project)) {
            this.formSrc += '/project';
          }

          this.formSrc += "/".concat(this.component.project);
          srcOptions.project = this.formSrc;
        }

        if (this.component.form) {
          this.formSrc += "/form/".concat(this.component.form);
        } else if (this.component.path) {
          this.formSrc += "/".concat(this.component.path);
        }
      } // Build the source based on the root src path.


      if (!this.formSrc && this.options.formio) {
        var rootSrc = this.options.formio.formsUrl;

        if (this.component.path) {
          var parts = rootSrc.split('/');
          parts.pop();
          this.formSrc = "".concat(parts.join('/'), "/").concat(this.component.path);
        }

        if (this.component.form) {
          this.formSrc = "".concat(rootSrc, "/").concat(this.component.form);
        }
      } // Determine if we already have a loaded form object.


      if (this.component && this.component.components && this.component.components.length) {
        this.renderSubForm(this.component, srcOptions);
      } else {
        new _Formio.default(this.formSrc).loadForm({
          params: {
            live: 1
          }
        }).then(function (formObj) {
          return _this3.renderSubForm(formObj, srcOptions);
        }).catch(function (err) {
          return _this3.subFormReadyReject(err);
        });
      }

      return this.subFormReady;
    }
    /* eslint-enable max-statements */

  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      if (this.subForm) {
        return this.subForm.checkValidity(this.dataValue.data, dirty);
      }

      return _get(_getPrototypeOf(FormComponent.prototype), "checkValidity", this).call(this, data, dirty);
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data) {
      return _get(_getPrototypeOf(FormComponent.prototype), "checkConditions", this).call(this, data) && this.subForm ? this.subForm.checkConditions(this.dataValue.data) : false;
    }
  }, {
    key: "calculateValue",
    value: function calculateValue(data, flags) {
      if (this.subForm) {
        return this.subForm.calculateValue(this.dataValue.data, flags);
      }

      return _get(_getPrototypeOf(FormComponent.prototype), "calculateValue", this).call(this, data, flags);
    }
  }, {
    key: "setPristine",
    value: function setPristine(pristine) {
      _get(_getPrototypeOf(FormComponent.prototype), "setPristine", this).call(this, pristine);

      if (this.subForm) {
        this.subForm.setPristine(pristine);
      }
    }
    /**
     * Submit the form before the next page is triggered.
     */

  }, {
    key: "beforeNext",
    value: function beforeNext() {
      var _this4 = this;

      // If we wish to submit the form on next page, then do that here.
      if (this.component.submit) {
        return this.loadSubForm().then(function () {
          return _this4.subForm.submitForm().then(function (result) {
            _this4.dataValue = result.submission;
            return _this4.dataValue;
          }).catch(function (err) {
            _this4.subForm.onSubmissionError(err);

            return _nativePromiseOnly.default.reject(err);
          });
        });
      } else {
        return _get(_getPrototypeOf(FormComponent.prototype), "beforeNext", this).call(this);
      }
    }
    /**
     * Submit the form before the whole form is triggered.
     */

  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      var _this5 = this;

      var submission = this.dataValue; // This submission has already been submitted, so just return the reference data.

      if (submission && submission._id && submission.form) {
        this.dataValue = this.component.reference ? {
          _id: submission._id,
          form: submission.form
        } : submission;
        return _nativePromiseOnly.default.resolve(this.dataValue);
      } // This submission has not been submitted yet.


      if (this.component.submit) {
        return this.loadSubForm().then(function () {
          return _this5.subForm.submitForm().then(function (result) {
            _this5.subForm.loading = false;
            _this5.dataValue = _this5.component.reference ? {
              _id: result.submission._id,
              form: result.submission.form
            } : result.submission;
            return _this5.dataValue;
          }).catch(function () {});
        });
      } else {
        return _get(_getPrototypeOf(FormComponent.prototype), "beforeSubmit", this).call(this);
      }
    }
  }, {
    key: "build",
    value: function build() {
      this.createElement(); // Do not restore the value when building before submission.

      if (!this.options.beforeSubmit) {
        this.restoreValue();
      }

      this.attachLogic();
    }
  }, {
    key: "setValue",
    value: function setValue(submission, flags) {
      var _this6 = this;

      var changed = _get(_getPrototypeOf(FormComponent.prototype), "setValue", this).call(this, submission, flags);

      (this.subForm ? _nativePromiseOnly.default.resolve(this.subForm) : this.loadSubForm()).then(function (form) {
        if (submission && submission._id && form.formio && !flags.noload && _lodash.default.isEmpty(submission.data)) {
          var submissionUrl = "".concat(form.formio.formsUrl, "/").concat(submission.form, "/submission/").concat(submission._id);
          form.setUrl(submissionUrl, _this6.options);
          form.nosubmit = false;
          form.loadSubmission();
        } else {
          form.setValue(submission, flags);
        }
      });
      return changed;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.subForm) {
        return this.subForm.getValue();
      }

      return this.dataValue;
    }
  }, {
    key: "getAllComponents",
    value: function getAllComponents() {
      if (!this.subForm) {
        return [];
      }

      return this.subForm.getAllComponents();
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return FormComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return {
        data: {}
      };
    }
  }]);

  return FormComponent;
}(_Base.default);

exports.default = FormComponent;