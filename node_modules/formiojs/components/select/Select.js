"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.array.find");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.promise");

var _choices = _interopRequireDefault(require("choices.js/assets/scripts/dist/choices.js"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

var _Formio = _interopRequireDefault(require("../../Formio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var SelectComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(SelectComponent, _BaseComponent);

  _createClass(SelectComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
        type: 'select',
        label: 'Select',
        key: 'select',
        data: {
          values: [],
          json: '',
          url: '',
          resource: '',
          custom: ''
        },
        dataSrc: 'values',
        valueProperty: '',
        filter: '',
        searchEnabled: true,
        searchField: '',
        minSearch: 0,
        authenticate: false,
        template: '<span>{{ item.label }}</span>',
        selectFields: ''
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Select',
        group: 'basic',
        icon: 'fa fa-th-list',
        weight: 70,
        documentation: 'http://help.form.io/userguide/#select',
        schema: SelectComponent.schema()
      };
    }
  }]);

  function SelectComponent(component, options, data) {
    var _this;

    _classCallCheck(this, SelectComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectComponent).call(this, component, options, data)); // Trigger an update.

    _this.triggerUpdate = _lodash.default.debounce(_this.updateItems.bind(_assertThisInitialized(_assertThisInitialized(_this))), 100); // Keep track of the select options.

    _this.selectOptions = []; // See if this should use the template.

    _this.useTemplate = _this.component.dataSrc !== 'values' && _this.component.template; // If this component has been activated.

    _this.activated = false; // Determine when the items have been loaded.

    _this.itemsLoaded = new Promise(function (resolve) {
      _this.itemsLoadedResolve = resolve;
    });
    return _this;
  }

  _createClass(SelectComponent, [{
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(SelectComponent.prototype), "elementInfo", this).call(this);

      info.type = 'select';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: "createWrapper",
    value: function createWrapper() {
      return false;
    }
  }, {
    key: "itemTemplate",
    value: function itemTemplate(data) {
      if (!data) {
        return '';
      } // Perform a fast interpretation if we should not use the template.


      if (data && !this.useTemplate) {
        var itemLabel = data.label || data;
        return typeof itemLabel === 'string' ? this.t(itemLabel) : itemLabel;
      }

      if (typeof data === 'string') {
        return this.t(data);
      }

      var template = this.component.template ? this.interpolate(this.component.template, {
        item: data
      }) : data.label;

      if (template) {
        var label = template.replace(/<\/?[^>]+(>|$)/g, '');
        return template.replace(label, this.t(label));
      } else {
        return JSON.stringify(data);
      }
    }
    /**
     * @param {*} data
     * @param {boolean} [forceUseValue=false] - if true, return 'value' property of the data
     * @return {*}
     */

  }, {
    key: "itemValue",
    value: function itemValue(data) {
      var forceUseValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (_lodash.default.isObject(data)) {
        if (this.component.valueProperty) {
          return _lodash.default.get(data, this.component.valueProperty);
        }

        if (forceUseValue) {
          return data.value;
        }
      }

      return data;
    }
  }, {
    key: "createInput",
    value: function createInput(container) {
      this.selectContainer = container;
      this.selectInput = _get(_getPrototypeOf(SelectComponent.prototype), "createInput", this).call(this, container);
    }
    /**
     * Adds an option to the select dropdown.
     *
     * @param value
     * @param label
     */

  }, {
    key: "addOption",
    value: function addOption(value, label, attr) {
      var option = {
        value: value,
        label: label
      };
      this.selectOptions.push(option);

      if (this.choices) {
        return;
      }

      option.element = document.createElement('option');

      if (this.dataValue === option.value) {
        option.element.setAttribute('selected', 'selected');
        option.element.selected = 'selected';
      }

      option.element.innerHTML = label;

      if (attr) {
        _lodash.default.each(attr, function (value, key) {
          option.element.setAttribute(key, value);
        });
      }

      this.selectInput.appendChild(option.element);
    }
  }, {
    key: "addValueOptions",
    value: function addValueOptions(items) {
      var _this2 = this;

      items = items || [];

      if (!this.selectOptions.length) {
        if (this.choices) {
          // Add the currently selected choices if they don't already exist.
          var currentChoices = Array.isArray(this.dataValue) ? this.dataValue : [this.dataValue];

          _lodash.default.each(currentChoices, function (choice) {
            _this2.addCurrentChoices(choice, items);
          });
        } else if (!this.component.multiple) {
          this.addPlaceholder(this.selectInput);
        }
      }
    }
    /* eslint-disable max-statements */

  }, {
    key: "setItems",
    value: function setItems(items, fromSearch) {
      var _this3 = this;

      // If the items is a string, then parse as JSON.
      if (typeof items == 'string') {
        try {
          items = JSON.parse(items);
        } catch (err) {
          console.warn(err.message);
          items = [];
        }
      } // Allow js processing (needed for form builder)


      if (this.component.onSetItems && typeof this.component.onSetItems === 'function') {
        var newItems = this.component.onSetItems(this, items);

        if (newItems) {
          items = newItems;
        }
      }

      if (!this.choices && this.selectInput) {
        if (this.loading) {
          this.removeChildFrom(this.selectInput, this.selectContainer);
        }

        this.selectInput.innerHTML = '';
      }

      this.selectOptions = []; // If they provided select values, then we need to get them instead.

      if (this.component.selectValues) {
        items = _lodash.default.get(items, this.component.selectValues);
      } // Add the value options.


      if (!fromSearch) {
        this.addValueOptions(items);
      }

      if (this.component.widget === 'html5' && !this.component.placeholder) {
        this.addOption(null, '');
      } // Iterate through each of the items.


      _lodash.default.each(items, function (item) {
        _this3.addOption(_this3.itemValue(item), _this3.itemTemplate(item));
      });

      if (this.choices) {
        this.choices.setChoices(this.selectOptions, 'value', 'label', true);
      } else if (this.loading) {
        // Re-attach select input.
        this.appendTo(this.selectInput, this.selectContainer);
      } // We are no longer loading.


      this.loading = false; // If a value is provided, then select it.

      if (this.dataValue) {
        this.setValue(this.dataValue, true);
      } else {
        // If a default value is provided then select it.
        var defaultValue = this.defaultValue;

        if (defaultValue) {
          this.setValue(defaultValue);
        }
      } // Say we are done loading the items.


      this.itemsLoadedResolve();
    }
    /* eslint-enable max-statements */

  }, {
    key: "loadItems",
    value: function loadItems(url, search, headers, options, method, body) {
      var _this4 = this;

      options = options || {}; // See if they have not met the minimum search requirements.

      var minSearch = parseInt(this.component.minSearch, 10);

      if (this.component.searchField && minSearch > 0 && (!search || search.length < minSearch)) {
        // Set empty items.
        return this.setItems([]);
      } // Ensure we have a method and remove any body if method is get


      method = method || 'GET';

      if (method.toUpperCase() === 'GET') {
        body = null;
      }

      var query = this.component.dataSrc === 'url' ? {} : {
        limit: 100,
        skip: 0
      }; // Allow for url interpolation.

      url = this.interpolate(url, {
        formioBase: _Formio.default.getBaseUrl()
      }); // Add search capability.

      if (this.component.searchField && search) {
        if (Array.isArray(search)) {
          query["".concat(this.component.searchField, "__in")] = search.join(',');
        } else {
          query[this.component.searchField] = search;
        }
      } // Add filter capability


      if (this.component.filter) {
        var filter = this.interpolate(this.component.filter);
        url += (!url.includes('?') ? '?' : '&') + filter;
      } // If they wish to return only some fields.


      if (this.component.selectFields) {
        query.select = this.component.selectFields;
      }

      if (!_lodash.default.isEmpty(query)) {
        // Add the query string.
        url += (!(url.indexOf('?') !== -1) ? '?' : '&') + _Formio.default.serialize(query);
      } // Make the request.


      options.header = headers;
      this.loading = true;

      _Formio.default.makeRequest(this.options.formio, 'select', url, method, body, options).then(function (response) {
        return _this4.setItems(response, !!search);
      }).catch(function (err) {
        _this4.loading = false;

        _this4.itemsLoadedResolve();

        _this4.emit('componentError', {
          component: _this4.component,
          message: err.toString()
        });

        console.warn("Unable to load resources for ".concat(_this4.key));
      });
    }
    /**
     * Get the request headers for this select dropdown.
     */

  }, {
    key: "updateCustomItems",
    value: function updateCustomItems() {
      this.setItems(this.evaluate(this.component.data.custom, {
        values: []
      }, 'values') || []);
    }
    /* eslint-disable max-statements */

  }, {
    key: "updateItems",
    value: function updateItems(searchInput, forceUpdate) {
      if (!this.component.data) {
        console.warn("Select component ".concat(this.key, " does not have data configuration."));
        this.itemsLoadedResolve();
        return;
      } // Only load the data if it is visible.


      if (!this.checkConditions()) {
        this.itemsLoadedResolve();
        return;
      }

      switch (this.component.dataSrc) {
        case 'values':
          this.component.valueProperty = 'value';
          this.setItems(this.component.data.values);
          break;

        case 'json':
          this.setItems(this.component.data.json);
          break;

        case 'custom':
          this.updateCustomItems();
          break;

        case 'resource':
          {
            // If there is no resource, or we are lazyLoading, wait until active.
            if (!this.component.data.resource || !forceUpdate && !this.active) {
              return;
            }

            var resourceUrl = this.options.formio ? this.options.formio.formsUrl : "".concat(_Formio.default.getProjectUrl(), "/form");
            resourceUrl += "/".concat(this.component.data.resource, "/submission");

            try {
              this.loadItems(resourceUrl, searchInput, this.requestHeaders);
            } catch (err) {
              console.warn("Unable to load resources for ".concat(this.key));
            }

            break;
          }

        case 'url':
          {
            if (!forceUpdate && !this.active) {
              // If we are lazyLoading, wait until activated.
              return;
            }

            var url = this.component.data.url;
            var method;
            var body;

            if (url.substr(0, 1) === '/') {
              var baseUrl = _Formio.default.getProjectUrl();

              if (!baseUrl) {
                baseUrl = _Formio.default.getBaseUrl();
              }

              url = baseUrl + this.component.data.url;
            }

            if (!this.component.data.method) {
              method = 'GET';
            } else {
              method = this.component.data.method;

              if (method.toUpperCase() === 'POST') {
                body = this.component.data.body;
              } else {
                body = null;
              }
            }

            this.loadItems(url, searchInput, this.requestHeaders, {
              noToken: true
            }, method, body);
            break;
          }
      }
    }
    /* eslint-enable max-statements */

  }, {
    key: "addPlaceholder",
    value: function addPlaceholder(input) {
      if (!this.component.placeholder || !input) {
        return;
      }

      var placeholder = document.createElement('option');
      placeholder.setAttribute('placeholder', true);
      placeholder.appendChild(this.text(this.component.placeholder));
      input.appendChild(placeholder);
    }
    /**
     * Activate this select control.
     */

  }, {
    key: "activate",
    value: function activate() {
      if (this.active) {
        return;
      }

      this.activated = true;

      if (this.choices) {
        this.choices.setChoices([{
          value: '',
          label: "<i class=\"".concat(this.iconClass('refresh'), "\" style=\"font-size:1.3em;\"></i>")
        }], 'value', 'label', true);
      } else {
        this.addOption('', this.t('loading...'));
      }

      this.triggerUpdate();
    }
  }, {
    key: "addInput",

    /* eslint-disable max-statements */
    value: function addInput(input, container) {
      var _this5 = this;

      _get(_getPrototypeOf(SelectComponent.prototype), "addInput", this).call(this, input, container);

      if (this.component.multiple) {
        input.setAttribute('multiple', true);
      }

      if (this.component.widget === 'html5') {
        this.triggerUpdate();
        this.focusableElement = input;
        this.addEventListener(input, 'focus', function () {
          return _this5.update();
        });
        this.addEventListener(input, 'keydown', function (event) {
          var keyCode = event.keyCode;

          if ([8, 46].includes(keyCode)) {
            _this5.setValue(null);
          }
        });
        return;
      }

      var useSearch = this.component.hasOwnProperty('searchEnabled') ? this.component.searchEnabled : true;
      var placeholderValue = this.t(this.component.placeholder);
      var choicesOptions = {
        removeItemButton: this.component.disabled ? false : _lodash.default.get(this.component, 'removeItemButton', true),
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices form-group formio-choices',
          containerInner: 'form-control'
        },
        addItemText: false,
        placeholder: !!this.component.placeholder,
        placeholderValue: placeholderValue,
        searchPlaceholderValue: this.t('Type to search'),
        shouldSort: false,
        position: this.component.dropdown || 'auto',
        searchEnabled: useSearch,
        searchChoices: !this.component.searchField,
        searchFields: ['label'],
        fuseOptions: {
          include: 'score',
          threshold: 0.3
        },
        itemComparer: _lodash.default.isEqual
      };
      var tabIndex = input.tabIndex;
      this.addPlaceholder(input);
      this.choices = new _choices.default(input, choicesOptions);

      if (this.component.multiple) {
        this.focusableElement = this.choices.input;
      } else {
        this.focusableElement = this.choices.containerInner;
        this.choices.containerOuter.setAttribute('tabIndex', '-1');

        if (useSearch) {
          this.addEventListener(this.choices.containerOuter, 'focus', function () {
            return _this5.focusableElement.focus();
          });
        }
      }

      this.addFocusBlurEvents(this.focusableElement);
      this.focusableElement.setAttribute('tabIndex', tabIndex);
      this.setInputStyles(this.choices.containerOuter); // If a search field is provided, then add an event listener to update items on search.

      if (this.component.searchField) {
        // Make sure to clear the search when no value is provided.
        if (this.choices && this.choices.input) {
          this.addEventListener(this.choices.input, 'input', function (event) {
            if (!event.target.value) {
              _this5.triggerUpdate();
            }
          });
        }

        this.addEventListener(input, 'search', function (event) {
          return _this5.triggerUpdate(event.detail.value);
        });
        this.addEventListener(input, 'stopSearch', function () {
          return _this5.triggerUpdate();
        });
      }

      this.addEventListener(input, 'showDropdown', function () {
        return _this5.update();
      });

      if (placeholderValue && this.choices.isSelectOneElement) {
        this.addEventListener(input, 'removeItem', function () {
          var items = _this5.choices.store.getItemsFilteredByActive();

          if (!items.length) {
            _this5.choices._addItem(placeholderValue, placeholderValue, 0, -1, null, true, null);
          }
        });
      } // Force the disabled state with getters and setters.


      this.disabled = this.disabled;
      this.triggerUpdate();
    }
    /* eslint-enable max-statements */

  }, {
    key: "update",
    value: function update() {
      if (this.component.dataSrc === 'custom') {
        this.updateCustomItems();
      } // Activate the control.


      this.activate();
    }
  }, {
    key: "show",
    value: function show(_show) {
      // If we go from hidden to visible, trigger a refresh.
      var triggerUpdate = _show && this._visible !== _show;
      _show = _get(_getPrototypeOf(SelectComponent.prototype), "show", this).call(this, _show);

      if (triggerUpdate) {
        this.triggerUpdate();
      }

      return _show;
    }
    /**
     * @param {*} value
     * @param {Array} items
     */

  }, {
    key: "addCurrentChoices",
    value: function addCurrentChoices(value, items) {
      var _this6 = this;

      if (value) {
        var found = false; // Make sure that `items` and `this.selectOptions` points
        // to the same reference. Because `this.selectOptions` is
        // internal property and all items are populated by
        // `this.addOption` method, we assume that items has
        // 'label' and 'value' properties. This assumption allows
        // us to read correct value from the item.

        var isSelectOptions = items === this.selectOptions;

        if (items && items.length) {
          _lodash.default.each(items, function (choice) {
            if (choice._id && value._id && choice._id === value._id) {
              found = true;
              return false;
            }

            found |= _lodash.default.isEqual(_this6.itemValue(choice, isSelectOptions), value);
            return found ? false : true;
          });
        } // Add the default option if no item is found.


        if (!found) {
          this.addOption(this.itemValue(value), this.itemTemplate(value));
        }
      }
    }
  }, {
    key: "getView",
    value: function getView(data) {
      return this.asString(data);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.viewOnly || this.loading || !this.selectOptions.length) {
        return this.dataValue;
      }

      var value = '';

      if (this.choices) {
        value = this.choices.getValue(true); // Make sure we don't get the placeholder

        if (!this.component.multiple && this.component.placeholder && value === this.t(this.component.placeholder)) {
          value = '';
        }
      } else {
        var values = [];

        _lodash.default.each(this.selectOptions, function (selectOption) {
          if (selectOption.element && selectOption.element.selected) {
            values.push(selectOption.value);
          }
        });

        value = this.component.multiple ? values : values.shift();
      } // Choices will return undefined if nothing is selected. We really want '' to be empty.


      if (value === undefined || value === null) {
        value = '';
      }

      return value;
    }
  }, {
    key: "redraw",
    value: function redraw() {
      _get(_getPrototypeOf(SelectComponent.prototype), "redraw", this).call(this);

      this.triggerUpdate();
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this7 = this;

      flags = this.getFlags.apply(this, arguments);
      var previousValue = this.dataValue;

      if (this.component.multiple && !Array.isArray(value)) {
        value = value ? [value] : [];
      }

      var hasPreviousValue = Array.isArray(previousValue) ? previousValue.length : previousValue;
      var hasValue = Array.isArray(value) ? value.length : value;
      var changed = this.hasChanged(value, previousValue);
      this.dataValue = value; // Do not set the value if we are loading... that will happen after it is done.

      if (this.loading) {
        return changed;
      } // Determine if we need to perform an initial lazyLoad api call if searchField is provided.


      if (this.component.searchField && this.component.lazyLoad && !this.lazyLoadInit && !this.active && !this.selectOptions.length && hasValue) {
        this.loading = true;
        this.lazyLoadInit = true;
        this.triggerUpdate(this.dataValue, true);
        return changed;
      } // Add the value options.


      this.addValueOptions();

      if (this.choices) {
        // Now set the value.
        if (hasValue) {
          this.choices.removeActiveItems(); // Add the currently selected choices if they don't already exist.

          var currentChoices = Array.isArray(this.dataValue) ? this.dataValue : [this.dataValue];

          _lodash.default.each(currentChoices, function (choice) {
            _this7.addCurrentChoices(choice, _this7.selectOptions);
          });

          this.choices.setChoices(this.selectOptions, 'value', 'label', true).setValueByChoice(value);
        } else if (hasPreviousValue) {
          this.choices.removeActiveItems();
        }
      } else {
        if (hasValue) {
          var values = Array.isArray(value) ? value : [value];

          _lodash.default.each(this.selectOptions, function (selectOption) {
            _lodash.default.each(values, function (val) {
              if (_lodash.default.isEqual(val, selectOption.value)) {
                selectOption.element.selected = true;
                selectOption.element.setAttribute('selected', 'selected');
                return false;
              }
            });
          });
        } else {
          _lodash.default.each(this.selectOptions, function (selectOption) {
            selectOption.element.selected = false;
            selectOption.element.removeAttribute('selected');
          });
        }
      }

      this.updateOnChange(flags, changed);
      return changed;
    }
    /**
     * Deletes the value of the component.
     */

  }, {
    key: "deleteValue",
    value: function deleteValue() {
      this.setValue('', {
        noUpdateEvent: true
      });

      _lodash.default.unset(this.data, this.key);
    }
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */

  }, {
    key: "validateMultiple",
    value: function validateMultiple() {
      // Select component will contain one input when flagged as multiple.
      return false;
    }
    /**
     * Ouput this select dropdown as a string value.
     * @return {*}
     */

  }, {
    key: "asString",
    value: function asString(value) {
      value = value || this.getValue();

      if (this.component.dataSrc === 'values') {
        value = _lodash.default.find(this.component.data.values, ['value', value]);
      }

      if (_lodash.default.isString(value)) {
        return value;
      }

      return _lodash.default.isObject(value) ? this.itemTemplate(value) : '-';
    }
  }, {
    key: "setupValueElement",
    value: function setupValueElement(element) {
      element.innerHTML = this.asString();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(SelectComponent.prototype), "destroy", this).call(this);

      if (this.choices) {
        this.choices.destroyed = true;
        this.choices.destroy();
        this.choices = null;
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.focusableElement.focus();
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.itemsLoaded;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return SelectComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }, {
    key: "requestHeaders",
    get: function get() {
      var _this8 = this;

      // Create the headers object.
      var headers = new Headers(); // Add custom headers to the url.

      if (this.component.data && this.component.data.headers) {
        try {
          _lodash.default.each(this.component.data.headers, function (header) {
            if (header.key) {
              headers.set(header.key, _this8.interpolate(header.value));
            }
          });
        } catch (err) {
          console.warn(err.message);
        }
      }

      return headers;
    }
  }, {
    key: "active",
    get: function get() {
      return !this.component.lazyLoad || this.activated;
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(SelectComponent.prototype), "disabled", disabled, this, true);

      if (!this.choices) {
        return;
      }

      if (disabled) {
        this.setDisabled(this.choices.containerInner, true);
        this.focusableElement.removeAttribute('tabIndex');
        this.choices.disable();
      } else {
        this.setDisabled(this.choices.containerInner, false);
        this.focusableElement.setAttribute('tabIndex', this.component.tabindex || 0);
        this.choices.enable();
      }
    }
  }]);

  return SelectComponent;
}(_Base.default);

exports.default = SelectComponent;