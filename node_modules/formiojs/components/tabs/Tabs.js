"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

var _lodash = _interopRequireDefault(require("lodash"));

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

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

var TabsComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(TabsComponent, _NestedComponent);

  _createClass(TabsComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        type: 'tabs',
        input: false,
        key: 'tabs',
        persistent: false,
        components: [{
          label: 'Tab 1',
          key: 'tab1',
          components: []
        }]
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Tabs',
        group: 'layout',
        icon: 'fa fa-folder-o',
        weight: 50,
        documentation: 'http://help.form.io/userguide/#tabs',
        schema: TabsComponent.schema()
      };
    }
  }]);

  function TabsComponent(component, options, data) {
    var _this;

    _classCallCheck(this, TabsComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TabsComponent).call(this, component, options, data));
    _this.currentTab = 0;
    return _this;
  }

  _createClass(TabsComponent, [{
    key: "createElement",
    value: function createElement() {
      var _this2 = this;

      this.tabBar = this.ce('ul', {
        class: 'nav nav-tabs'
      });
      this.tabContent = this.ce('div', {
        class: 'tab-content'
      });
      this.tabs = [];
      this.tabLinks = [];

      _lodash.default.each(this.component.components, function (tab, index) {
        var tabPanel = _this2.ce('div', {
          role: 'tabpanel',
          class: 'tab-pane',
          id: tab.key
        });

        var tabLink = _this2.ce('a', {
          class: 'nav-link',
          href: "#".concat(tab.key)
        }, tab.label);

        _this2.addEventListener(tabLink, 'click', function (event) {
          event.preventDefault();

          _this2.setTab(index);
        });

        var tabElement = _this2.ce('li', {
          class: 'nav-item',
          role: 'presentation'
        }, tabLink);

        tabElement.tabLink = tabLink;

        _this2.tabLinks.push(tabElement);

        _this2.tabs.push(tabPanel);

        _this2.tabBar.appendChild(tabElement);

        _this2.tabContent.appendChild(tabPanel);
      });

      this.element = this.ce('div', {
        id: this.id,
        class: this.className
      }, [this.tabBar, this.tabContent]);
      this.element.component = this;
      return this.element;
    }
    /**
     * Set the current tab.
     *
     * @param index
     */

  }, {
    key: "setTab",
    value: function setTab(index, state) {
      var _this3 = this;

      if (!this.tabs || !this.component.components || !this.component.components[this.currentTab] || this.currentTab >= this.tabs.length) {
        return;
      }

      this.currentTab = index; // Get the current tab.

      var tab = this.component.components[this.currentTab];
      this.empty(this.tabs[this.currentTab]);

      _lodash.default.remove(this.components, function (comp) {
        return comp.component.tab === _this3.currentTab;
      });

      var components = this.hook('addComponents', tab.components, this);

      _lodash.default.each(components, function (component) {
        return _this3.addComponent(component, _this3.tabs[_this3.currentTab], _this3.data, null, null, state);
      });

      this.restoreValue();

      if (this.tabLinks.length <= index) {
        return;
      }

      _lodash.default.each(this.tabLinks, function (tabLink) {
        _this3.removeClass(tabLink, 'active');

        _this3.removeClass(tabLink.tabLink, 'active');
      });

      this.addClass(this.tabLinks[index], 'active');
      this.addClass(this.tabLinks[index].tabLink, 'active');

      _lodash.default.each(this.tabs, function (tab) {
        _this3.removeClass(tab, 'active');
      });

      this.addClass(this.tabs[index], 'active');
      this.triggerChange();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var state = _get(_getPrototypeOf(TabsComponent.prototype), "destroy", this).call(this) || {};
      state.currentTab = this.currentTab;
      return state;
    }
    /**
     * Make sure to include the tab on the component as it is added.
     *
     * @param component
     * @param element
     * @param data
     * @param before
     * @return {BaseComponent}
     */

  }, {
    key: "addComponent",
    value: function addComponent(component, element, data, before, noAdd, state) {
      component.tab = this.currentTab;
      return _get(_getPrototypeOf(TabsComponent.prototype), "addComponent", this).call(this, component, element, data, before, noAdd, state);
    }
    /**
     * Only add the components for the active tab.
     */

  }, {
    key: "addComponents",
    value: function addComponents(element, data, options, state) {
      var currentTab = state && state.currentTab ? state.currentTab : this.currentTab;
      this.setTab(currentTab, state);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TabsComponent.schema();
    }
  }, {
    key: "schema",
    get: function get() {
      var schema = _get(_getPrototypeOf(TabsComponent.prototype), "schema", this);

      schema.components = [];

      var allComponents = _lodash.default.groupBy(this.getComponents(), 'component.tab');

      _lodash.default.each(this.component.components, function (tab, index) {
        var tabSchema = tab;
        tabSchema.components = [];

        _lodash.default.each(allComponents[index], function (component) {
          return tabSchema.components.push(component.schema);
        });

        schema.components.push(tabSchema);
      });

      return schema;
    }
  }]);

  return TabsComponent;
}(_NestedComponent2.default);

exports.default = TabsComponent;