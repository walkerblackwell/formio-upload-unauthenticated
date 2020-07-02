"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.assign");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Webform2 = _interopRequireDefault(require("./Webform"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _utils = require("./utils/utils");

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

var Wizard =
/*#__PURE__*/
function (_Webform) {
  _inherits(Wizard, _Webform);

  /**
   * Constructor for wizard based forms
   * @param element Dom element to place this wizard.
   * @param {Object} options Options object, supported options are:
   *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
   *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
   */
  function Wizard(element, options) {
    var _this;

    _classCallCheck(this, Wizard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wizard).call(this, element, options));
    _this.wizard = null;
    _this.pages = [];
    _this.globalComponents = [];
    _this.page = 0;
    _this.history = [];
    _this._nextPage = 0;
    return _this;
  }

  _createClass(Wizard, [{
    key: "getPages",
    value: function getPages() {
      var _this2 = this;

      var pageOptions = _lodash.default.clone(this.options);

      var components = _lodash.default.clone(this.components); // We shouldn't recreate a components on the page we currently on to avoid duplicate inputs desync.


      return this.pages.map(function (page, index) {
        return _this2.createComponent(page, Object.assign({}, pageOptions, {
          components: index === _this2.page ? components : null
        }));
      });
    }
  }, {
    key: "getComponents",
    value: function getComponents() {
      return this.submitting ? this.getPages() : _get(_getPrototypeOf(Wizard.prototype), "getComponents", this).call(this);
    }
  }, {
    key: "resetValue",
    value: function resetValue() {
      this.getPages().forEach(function (page) {
        return page.resetValue();
      });
      this.setPristine(true);
    }
  }, {
    key: "setPage",
    value: function setPage(num) {
      if (!this.wizard.full && num >= 0 && num < this.pages.length) {
        this.page = num;
        return _get(_getPrototypeOf(Wizard.prototype), "setForm", this).call(this, this.currentPage());
      } else if (this.wizard.full || !this.pages.length) {
        return _get(_getPrototypeOf(Wizard.prototype), "setForm", this).call(this, this.getWizard());
      }

      return _nativePromiseOnly.default.reject('Page not found');
    }
  }, {
    key: "getNextPage",
    value: function getNextPage(data, currentPage) {
      var form = this.pages[currentPage]; // Check conditional nextPage

      if (form) {
        var page = ++currentPage;

        if (form.nextPage) {
          var next = this.evaluate(form.nextPage, {
            next: page,
            data: data,
            page: page,
            form: form
          }, 'next');

          if (next === null) {
            return null;
          }

          var pageNum = parseInt(next, 10);

          if (!isNaN(parseInt(pageNum, 10)) && isFinite(pageNum)) {
            return pageNum;
          }

          return this.getPageIndexByKey(next);
        }

        return page;
      }

      return null;
    }
  }, {
    key: "getPreviousPage",
    value: function getPreviousPage() {
      var prev = this.history.pop();

      if (typeof prev !== 'undefined') {
        return prev;
      }

      return this.page - 1;
    }
  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      return _nativePromiseOnly.default.all(this.getPages().map(function (page) {
        page.options.beforeSubmit = true;
        return page.beforeSubmit();
      }));
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var _this3 = this;

      // Read-only forms should not worry about validation before going to next page, nor should they submit.
      if (this.options.readOnly) {
        this.history.push(this.page);
        return this.setPage(this.getNextPage(this.submission.data, this.page)).then(function () {
          _this3._nextPage = _this3.getNextPage(_this3.submission.data, _this3.page);

          _this3.emit('nextPage', {
            page: _this3.page,
            submission: _this3.submission
          });
        });
      } // Validate the form builed, before go to the next page


      if (this.checkValidity(this.submission.data, true)) {
        this.checkData(this.submission.data, {
          noValidate: true
        });
        return this.beforeNext().then(function () {
          _this3.history.push(_this3.page);

          return _this3.setPage(_this3.getNextPage(_this3.submission.data, _this3.page)).then(function () {
            _this3._nextPage = _this3.getNextPage(_this3.submission.data, _this3.page);

            _this3.emit('nextPage', {
              page: _this3.page,
              submission: _this3.submission
            });
          });
        });
      } else {
        return _nativePromiseOnly.default.reject(this.showErrors(null, true));
      }
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      var _this4 = this;

      var prevPage = this.getPreviousPage();
      return this.setPage(prevPage).then(function () {
        _this4.emit('prevPage', {
          page: _this4.page,
          submission: _this4.submission
        });
      });
    }
  }, {
    key: "cancel",
    value: function cancel(noconfirm) {
      if (_get(_getPrototypeOf(Wizard.prototype), "cancel", this).call(this, noconfirm)) {
        this.history = [];
        return this.setPage(0);
      } else {
        return this.setPage();
      }
    }
  }, {
    key: "getPageIndexByKey",
    value: function getPageIndexByKey(key) {
      var pageIndex = 0;
      this.pages.forEach(function (page, index) {
        if (page.key === key) {
          pageIndex = index;
          return false;
        }
      });
      return pageIndex;
    }
  }, {
    key: "addGlobalComponents",
    value: function addGlobalComponents(page) {
      // If there are non-page components, then add them here. This is helpful to allow for hidden fields that
      // can propogate between pages.
      if (this.globalComponents.length) {
        page.components = this.globalComponents.concat(page.components);
      }

      return page;
    }
  }, {
    key: "getPage",
    value: function getPage(pageNum) {
      if (pageNum >= 0 && pageNum < this.pages.length) {
        return this.addGlobalComponents(this.pages[pageNum]);
      }

      return null;
    }
  }, {
    key: "getWizard",
    value: function getWizard() {
      var pageIndex = 0;
      var page = null;

      var wizard = _lodash.default.clone(this.wizard);

      wizard.components = [];

      do {
        page = this.getPage(pageIndex);

        if (page) {
          wizard.components.push(page);
        }

        pageIndex = this.getNextPage(this.submission.data, pageIndex);
      } while (pageIndex); // Add all other components.


      this.wizard.components.forEach(function (component) {
        if (component.type !== 'panel') {
          wizard.components.push(component);
        }
      });
      return wizard;
    }
  }, {
    key: "currentPage",
    value: function currentPage() {
      return this.getPage(this.page);
    }
  }, {
    key: "buildPages",
    value: function buildPages(form) {
      var _this5 = this;

      this.pages = [];
      form.components.forEach(function (component) {
        if (component.type === 'panel') {
          // Ensure that this page can be seen.
          if ((0, _utils.checkCondition)(component, _this5.data, _this5.data, _this5.wizard, _this5)) {
            _this5.pages.push(component);
          }
        } else if (component.type === 'hidden') {
          // Global components are hidden components that can propagate between pages.
          _this5.globalComponents.push(component);
        }
      });
      this.buildWizardHeader();
      this.buildWizardNav();
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      if (!form) {
        return;
      }

      this.wizard = form;
      this.buildPages(this.wizard);
      return this.setPage(this.page);
    }
  }, {
    key: "build",
    value: function build() {
      var _this6 = this;

      _get(_getPrototypeOf(Wizard.prototype), "build", this).call(this);

      this.formReady.then(function () {
        _this6.buildWizardHeader();

        _this6.buildWizardNav();
      });
    }
  }, {
    key: "hasButton",
    value: function hasButton(name, nextPage) {
      // Check for and initlize button settings object
      this.options.buttonSettings = _lodash.default.defaults(this.options.buttonSettings, {
        showPrevious: true,
        showNext: true,
        showCancel: !this.options.readOnly
      });

      if (name === 'previous') {
        return this.page > 0 && this.options.buttonSettings.showPrevious;
      }

      nextPage = nextPage === undefined ? this.getNextPage(this.submission.data, this.page) : nextPage;

      if (name === 'next') {
        return nextPage !== null && nextPage < this.pages.length && this.options.buttonSettings.showNext;
      }

      if (name === 'cancel') {
        return this.options.buttonSettings.showCancel;
      }

      if (name === 'submit') {
        return !this.options.readOnly && (nextPage === null || this.page === this.pages.length - 1);
      }

      return true;
    }
  }, {
    key: "buildWizardHeader",
    value: function buildWizardHeader() {
      var _this7 = this;

      if (this.wizardHeader) {
        this.wizardHeader.innerHTML = '';
      }

      var currentPage = this.currentPage();

      if (!currentPage || this.wizard.full) {
        return;
      }

      currentPage.breadcrumb = currentPage.breadcrumb || 'default';

      if (currentPage.breadcrumb.toLowerCase() === 'none') {
        return;
      } // Check for and initlize breadcrumb settings object


      this.options.breadcrumbSettings = _lodash.default.defaults(this.options.breadcrumbSettings, {
        clickable: true
      });
      this.wizardHeader = this.ce('nav', {
        'aria-label': 'navigation'
      });
      this.wizardHeaderList = this.ce('ul', {
        class: 'pagination'
      });
      this.wizardHeader.appendChild(this.wizardHeaderList); // Add the header to the beginning.

      this.prepend(this.wizardHeader);
      var showHistory = currentPage.breadcrumb.toLowerCase() === 'history';
      this.pages.forEach(function (page, i) {
        // See if this page is in our history.
        if (showHistory && _this7.page !== i && !_this7.history.includes(i)) {
          return;
        } // Set clickable based on breadcrumb settings


        var clickable = _this7.page !== i && _this7.options.breadcrumbSettings.clickable;
        var pageClass = 'page-item ';
        pageClass += i === _this7.page ? 'active' : clickable ? '' : 'disabled';

        var pageButton = _this7.ce('li', {
          class: pageClass,
          style: clickable ? 'cursor: pointer;' : ''
        }); // Navigate to the page as they click on it.


        if (clickable) {
          _this7.addEventListener(pageButton, 'click', function (event) {
            _this7.emit('wizardNavigationClicked', _this7.pages[i]);

            event.preventDefault();

            _this7.setPage(i);
          });
        }

        var pageLabel = _this7.ce('span', {
          class: 'page-link'
        });

        var pageTitle = page.title;

        if (currentPage.breadcrumb.toLowerCase() === 'condensed') {
          pageTitle = i === _this7.page || showHistory ? page.title : i + 1;

          if (!pageTitle) {
            pageTitle = i + 1;
          }
        }

        pageLabel.appendChild(_this7.text(pageTitle));
        pageButton.appendChild(pageLabel);

        _this7.wizardHeaderList.appendChild(pageButton);
      });
    }
  }, {
    key: "pageId",
    value: function pageId(page) {
      if (page.key) {
        return page.key;
      } else if (page.components && page.components.length > 0) {
        return this.pageId(page.components[0]);
      } else {
        return page.title;
      }
    }
  }, {
    key: "onChange",
    value: function onChange(flags, changed) {
      var _this8 = this;

      _get(_getPrototypeOf(Wizard.prototype), "onChange", this).call(this, flags, changed); // Only rebuild if there is a page change.


      var pageIndex = 0;
      var rebuild = false;
      this.wizard.components.forEach(function (component) {
        if (component.type !== 'panel') {
          return;
        }

        if ((0, _utils.hasCondition)(component)) {
          var hasPage = _this8.pages && _this8.pages[pageIndex] && _this8.pageId(_this8.pages[pageIndex]) === _this8.pageId(component);

          var shouldShow = (0, _utils.checkCondition)(component, _this8.data, _this8.data, _this8.wizard, _this8);

          if (shouldShow && !hasPage || !shouldShow && hasPage) {
            rebuild = true;
            return false;
          }

          if (shouldShow) {
            pageIndex++;
          }
        } else {
          pageIndex++;
        }
      });

      if (rebuild) {
        this.setForm(this.wizard);
      } // Update Wizard Nav


      var nextPage = this.getNextPage(this.submission.data, this.page);

      if (this._nextPage !== nextPage) {
        this.buildWizardNav(nextPage);
        this.emit('updateWizardNav', {
          oldpage: this._nextPage,
          newpage: nextPage,
          submission: this.submission
        });
        this._nextPage = nextPage;
      }
    }
  }, {
    key: "buildWizardNav",
    value: function buildWizardNav(nextPage) {
      var _this9 = this;

      if (this.wizardNav) {
        this.wizardNav.innerHTML = '';
        this.removeChild(this.wizardNav);
      }

      if (this.wizard.full) {
        return;
      }

      this.wizardNav = this.ce('ul', {
        class: 'list-inline'
      });
      this.element.appendChild(this.wizardNav);
      [{
        name: 'cancel',
        method: 'cancel',
        class: 'btn btn-default btn-secondary'
      }, {
        name: 'previous',
        method: 'prevPage',
        class: 'btn btn-primary'
      }, {
        name: 'next',
        method: 'nextPage',
        class: 'btn btn-primary'
      }, {
        name: 'submit',
        method: 'submit',
        class: 'btn btn-primary'
      }].forEach(function (button) {
        if (!_this9.hasButton(button.name, nextPage)) {
          return;
        }

        var buttonWrapper = _this9.ce('li', {
          class: 'list-inline-item'
        });

        var buttonProp = "".concat(button.name, "Button");

        var buttonElement = _this9[buttonProp] = _this9.ce('button', {
          class: "".concat(button.class, " btn-wizard-nav-").concat(button.name)
        });

        buttonElement.appendChild(_this9.text(_this9.t(button.name)));

        _this9.addEventListener(_this9[buttonProp], 'click', function (event) {
          event.preventDefault(); // Disable the button until done.

          buttonElement.setAttribute('disabled', 'disabled');

          _this9.setLoading(buttonElement, true); // Call the button method, then re-enable the button.


          _this9[button.method]().then(function () {
            buttonElement.removeAttribute('disabled');

            _this9.setLoading(buttonElement, false);
          }).catch(function () {
            buttonElement.removeAttribute('disabled');

            _this9.setLoading(buttonElement, false);
          });
        });

        buttonWrapper.appendChild(_this9[buttonProp]);

        _this9.wizardNav.appendChild(buttonWrapper);
      });
    }
  }, {
    key: "schema",
    get: function get() {
      return this.wizard;
    }
  }]);

  return Wizard;
}(_Webform2.default);

exports.default = Wizard;
Wizard.setBaseUrl = _Formio.default.setBaseUrl;
Wizard.setApiUrl = _Formio.default.setApiUrl;
Wizard.setAppUrl = _Formio.default.setAppUrl;