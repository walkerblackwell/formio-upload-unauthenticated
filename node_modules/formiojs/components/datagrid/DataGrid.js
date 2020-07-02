"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _lodash = _interopRequireDefault(require("lodash"));

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

var _Base = _interopRequireDefault(require("../base/Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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

var DataGridComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(DataGridComponent, _NestedComponent);

  _createClass(DataGridComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Data Grid',
        key: 'dataGrid',
        type: 'datagrid',
        clearOnHide: true,
        input: true,
        tree: true,
        components: []
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Data Grid',
        icon: 'fa fa-th',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#datagrid',
        weight: 20,
        schema: DataGridComponent.schema()
      };
    }
  }]);

  function DataGridComponent(component, options, data) {
    var _this;

    _classCallCheck(this, DataGridComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataGridComponent).call(this, component, options, data));
    _this.type = 'datagrid';
    _this.numRows = 0;
    _this.numColumns = 0;
    _this.rows = [];
    return _this;
  }

  _createClass(DataGridComponent, [{
    key: "hasAddButton",
    value: function hasAddButton() {
      var maxLength = _lodash.default.get(this.component, 'validate.maxLength');

      return !this.component.disableAddingRemovingRows && !this.shouldDisable && !this.options.builder && !this.options.preview && (!maxLength || this.dataValue.length < maxLength);
    }
  }, {
    key: "hasExtraColumn",
    value: function hasExtraColumn() {
      return this.hasRemoveButtons() || this.options.builder;
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.shouldDisable && !this.options.builder && this.dataValue.length > _lodash.default.get(this.component, 'validate.minLength', 0);
    }
  }, {
    key: "hasTopSubmit",
    value: function hasTopSubmit() {
      return this.hasAddButton() && ['top', 'both'].includes(this.addAnotherPosition);
    }
  }, {
    key: "hasBottomSubmit",
    value: function hasBottomSubmit() {
      return this.hasAddButton() && ['bottom', 'both'].includes(this.addAnotherPosition);
    }
  }, {
    key: "hasChanged",
    value: function hasChanged(before, after) {
      return !_lodash.default.isEqual(before, after);
    }
  }, {
    key: "build",
    value: function build() {
      var _this2 = this;

      this.createElement();
      this.createLabel(this.element);
      var tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
      ['striped', 'bordered', 'hover', 'condensed'].forEach(function (prop) {
        if (_this2.component[prop]) {
          tableClass += "table-".concat(prop, " ");
        }
      });
      this.tableElement = this.ce('table', {
        class: tableClass
      });
      this.element.appendChild(this.tableElement);

      if (!this.dataValue.length) {
        this.addNewValue();
      }

      this.visibleColumns = true;
      this.errorContainer = this.element;
      this.restoreValue();
      this.createDescription(this.element);
      this.attachLogic();
    }
  }, {
    key: "setVisibleComponents",
    value: function setVisibleComponents() {
      var _this3 = this;

      // Add new values based on minLength.
      for (var dIndex = this.dataValue.length; dIndex < _lodash.default.get(this.component, 'validate.minLength', 0); dIndex++) {
        this.dataValue.push({});
      }

      this.numColumns = this.hasExtraColumn() ? 1 : 0;
      this.numRows = this.dataValue.length;

      if (this.visibleColumns === true) {
        this.numColumns += this.component.components.length;
        this.visibleComponents = this.component.components;
        return this.visibleComponents;
      }

      this.visibleComponents = this.component.components.filter(function (comp) {
        return _this3.visibleColumns[comp.key];
      });
      this.numColumns += this.visibleComponents.length;
    }
  }, {
    key: "buildRows",
    value: function buildRows() {
      var _this4 = this;

      this.setVisibleComponents();
      var state = this.destroy();
      this.empty(this.tableElement); // Build the rows.

      var tableRows = [];
      this.dataValue.forEach(function (row, rowIndex) {
        return tableRows.push(_this4.buildRow(row, rowIndex, state.rows[rowIndex]));
      }); // Create the header (must happen after build rows to get correct column length)

      var header = this.createHeader();

      if (header) {
        this.tableElement.appendChild(header);
      }

      this.tableElement.appendChild(this.ce('tbody', null, tableRows)); // Create the add row button footer element.

      if (this.hasBottomSubmit()) {
        this.tableElement.appendChild(this.ce('tfoot', null, this.ce('tr', null, this.ce('td', {
          colspan: this.numColumns
        }, this.addButton()))));
      }
    } // Build the header.

  }, {
    key: "createHeader",
    value: function createHeader() {
      var _this5 = this;

      var hasTopButton = this.hasTopSubmit();
      var hasEnd = this.hasExtraColumn() || hasTopButton;
      var needsHeader = false;
      var thead = this.ce('thead', null, this.ce('tr', null, [this.visibleComponents.map(function (comp) {
        var th = _this5.ce('th');

        if (comp.validate && comp.validate.required) {
          th.setAttribute('class', 'field-required');
        }

        var title = comp.label || comp.title;

        if (title && !comp.dataGridLabel) {
          needsHeader = true;
          th.appendChild(_this5.text(title));

          _this5.createTooltip(th, comp);
        }

        return th;
      }), hasEnd ? this.ce('th', null, hasTopButton ? this.addButton(true) : null) : null]));
      return needsHeader ? thead : null;
    }
  }, {
    key: "buildRow",
    value: function buildRow(row, index, state) {
      var _this6 = this;

      state = state || {};
      this.rows[index] = {};
      var lastColumn = null;

      if (this.hasRemoveButtons()) {
        lastColumn = this.ce('td', null, this.removeButton(index));
      } else if (this.options.builder) {
        lastColumn = this.ce('td', {
          id: "".concat(this.id, "-drag-container"),
          class: 'drag-container'
        }, this.ce('div', {
          id: "".concat(this.id, "-placeholder"),
          class: 'alert alert-info',
          style: 'text-align:center; margin-bottom: 0px;',
          role: 'alert'
        }, this.text('Drag and Drop a form component')));
        this.root.addDragContainer(lastColumn, this);
      }

      return this.ce('tr', null, [this.component.components.map(function (col, colIndex) {
        return _this6.buildComponent(col, colIndex, row, index, state[col.key]);
      }), lastColumn]);
    }
  }, {
    key: "destroyRows",
    value: function destroyRows() {
      var _this7 = this;

      var state = {};
      state.rows = state.rows || {};
      this.rows.forEach(function (row, rowIndex) {
        return _lodash.default.forIn(row, function (col) {
          state.rows[rowIndex] = state.rows[rowIndex] || {};

          var compState = _this7.removeComponent(col, row);

          if (col.key && compState) {
            state.rows[rowIndex][col.key] = compState;
          }
        });
      });
      this.rows = [];
      return state;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var state = this.destroyRows();

      _get(_getPrototypeOf(DataGridComponent.prototype), "destroy", this).call(this);

      return state;
    }
  }, {
    key: "buildComponent",
    value: function buildComponent(col, colIndex, row, rowIndex, state) {
      var container;
      var isVisible = this.visibleColumns && (!this.visibleColumns.hasOwnProperty(col.key) || this.visibleColumns[col.key]);

      if (isVisible || this.options.builder) {
        container = this.ce('td');
        container.noDrop = true;
      }

      var column = _lodash.default.clone(col);

      var options = _lodash.default.clone(this.options);

      options.name += "[".concat(rowIndex, "]");
      options.row = "".concat(rowIndex, "-").concat(colIndex);
      options.inDataGrid = true;
      var comp = this.createComponent(_lodash.default.assign({}, column, {
        row: options.row
      }), options, row, null, state);
      comp.rowIndex = rowIndex;
      this.hook('addComponent', container, comp, this);
      this.rows[rowIndex][column.key] = comp;

      if (isVisible || this.options.builder) {
        container.appendChild(comp.getElement());
        return container;
      }
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data) {
      var _this8 = this;

      var show = _get(_getPrototypeOf(DataGridComponent.prototype), "checkConditions", this).call(this, data); // If table isn't visible, don't bother calculating columns.


      if (!show) {
        return false;
      }

      var rebuild = false;

      if (this.visibleColumns === true) {
        this.visibleColumns = {};
      }

      this.component.components.forEach(function (col) {
        var showColumn = false;

        _this8.rows.forEach(function (comps) {
          if (comps && comps[col.key] && typeof comps[col.key].checkConditions === 'function') {
            showColumn |= comps[col.key].checkConditions(data);
          }
        });

        showColumn = showColumn && col.type !== 'hidden' && !col.hidden;

        if (_this8.visibleColumns[col.key] && !showColumn || !_this8.visibleColumns[col.key] && showColumn) {
          rebuild = true;
        }

        _this8.visibleColumns[col.key] = showColumn;
        show |= showColumn;
      }); // If a rebuild is needed, then rebuild the table.

      if (rebuild) {
        this.restoreValue();
      } // Return if this table should show.


      return show;
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Base.default.prototype.updateValue.call(this, flags, value);
    }
    /* eslint-disable max-statements */

  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this9 = this;

      flags = this.getFlags.apply(this, arguments);

      if (!value) {
        this.dataValue = this.defaultValue;
        this.buildRows();
        return;
      }

      if (!Array.isArray(value)) {
        if (_typeof(value) === 'object') {
          value = [value];
        } else {
          this.buildRows();
          return;
        }
      }

      var changed = this.hasChanged(value, this.dataValue); //always should build if not built yet OR is trying to set empty value (in order to prevent deleting last row)

      var shouldBuildRows = !this.isBuilt || changed || _lodash.default.isEqual(this.emptyValue, value); //check if visible columns changed


      var visibleColumnsAmount = 0;

      _lodash.default.forEach(this.visibleColumns, function (value) {
        if (value) {
          visibleColumnsAmount++;
        }
      });

      var visibleComponentsAmount = this.visibleComponents ? this.visibleComponents.length : 0; //should build if visible columns changed

      shouldBuildRows = shouldBuildRows || visibleColumnsAmount !== visibleComponentsAmount; //loop through all rows and check if there is field in new value that differs from current value

      var keys = this.componentComponents.map(function (component) {
        return component.key;
      });

      for (var i = 0; i < value.length; i++) {
        if (shouldBuildRows) {
          break;
        }

        var valueRow = value[i];

        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var newFieldValue = valueRow[key];
          var currentFieldValue = this.rows[i] && this.rows[i][key] ? this.rows[i][key].getValue() : undefined;
          var defaultFieldValue = this.rows[i] && this.rows[i][key] ? this.rows[i][key].defaultValue : undefined;
          var isMissingValue = newFieldValue === undefined && currentFieldValue === defaultFieldValue;

          if (!isMissingValue && !_lodash.default.isEqual(newFieldValue, currentFieldValue)) {
            shouldBuildRows = true;
            break;
          }
        }
      }

      this.dataValue = value;

      if (shouldBuildRows) {
        this.buildRows();
      }

      this.rows.forEach(function (row, index) {
        if (value.length <= index) {
          return;
        }

        _lodash.default.forIn(row, function (component) {
          return _this9.setNestedValue(component, value[index], flags);
        });
      });
      return changed;
    }
    /* eslint-enable max-statements */

    /**
     * Get the value of this component.
     *
     * @returns {*}
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      var _this10 = this;

      this.rows.forEach(function (row, index) {
        return _lodash.default.forIn(row, function (component) {
          return component.data = _this10.dataValue[index];
        });
      });
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return DataGridComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [{}];
    }
  }, {
    key: "addAnotherPosition",
    get: function get() {
      return _lodash.default.get(this.component, 'addAnotherPosition', 'bottom');
    }
  }, {
    key: "dataValue",
    get: function get() {
      var dataValue = _get(_getPrototypeOf(DataGridComponent.prototype), "dataValue", this);

      if (!dataValue || !Array.isArray(dataValue)) {
        return this.emptyValue;
      }

      return dataValue;
    },
    set: function set(value) {
      _set(_getPrototypeOf(DataGridComponent.prototype), "dataValue", value, this, true);
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(DataGridComponent.prototype), "defaultValue", this);

      if (Array.isArray(value)) {
        return value;
      }

      if (value && _typeof(value) === 'object') {
        return [value];
      }

      return this.emptyValue;
    }
  }]);

  return DataGridComponent;
}(_NestedComponent2.default);

exports.default = DataGridComponent;