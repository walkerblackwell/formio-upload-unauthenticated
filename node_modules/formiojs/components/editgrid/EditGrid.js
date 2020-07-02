"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/web.dom.iterable");

var _lodash = _interopRequireDefault(require("lodash"));

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

var _Base = _interopRequireDefault(require("../base/Base"));

var _Components = _interopRequireDefault(require("../Components"));

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

var EditGridComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(EditGridComponent, _NestedComponent);

  _createClass(EditGridComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        type: 'editgrid',
        label: 'Edit Grid',
        key: 'editGrid',
        clearOnHide: true,
        input: true,
        tree: true,
        defaultOpen: false,
        removeRow: '',
        components: [],
        templates: {
          header: this.defaultHeaderTemplate,
          row: this.defaultRowTemplate,
          footer: ''
        }
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Edit Grid',
        icon: 'fa fa-tasks',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#editgrid',
        weight: 40,
        schema: EditGridComponent.schema()
      };
    }
  }, {
    key: "defaultHeaderTemplate",
    get: function get() {
      return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\">{{ component.label }}</div>\n  {% }) %}\n</div>";
    }
  }, {
    key: "defaultRowTemplate",
    get: function get() {
      return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\">\n      {{ getView(component, row[component.key]) }}\n    </div>\n  {% }) %}\n  <div class=\"col-sm-2\">\n    <div class=\"btn-group pull-right\">\n      <button class=\"btn btn-default btn-sm editRow\">Edit</button>\n      <button class=\"btn btn-danger btn-sm removeRow\">Delete</button>\n    </div>\n  </div>\n</div>";
    }
  }]);

  function EditGridComponent(component, options, data) {
    var _this;

    _classCallCheck(this, EditGridComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditGridComponent).call(this, component, options, data));
    _this.type = 'datagrid';
    _this.editRows = [];
    return _this;
  }

  _createClass(EditGridComponent, [{
    key: "build",
    value: function build(state) {
      var _this2 = this;

      if (this.options.builder) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "build", this).call(this, state, true);
      }

      this.createElement();
      this.createLabel(this.element); // Ensure we always have rows for each dataValue available.

      this.dataValue.forEach(function (row, rowIndex) {
        if (_this2.editRows[rowIndex]) {
          _this2.editRows[rowIndex].data = row;
        } else {
          _this2.editRows[rowIndex] = {
            components: [],
            isOpen: !!_this2.options.defaultOpen,
            data: row
          };
        }
      });
      this.buildTable();
      this.createDescription(this.element);
      this.createAddButton();
      this.element.appendChild(this.errorContainer = this.ce('div', {
        class: 'has-error'
      }));
      this.attachLogic();
    }
  }, {
    key: "buildTable",
    value: function buildTable(fromBuild) {
      var _this3 = this;

      // Do not show the table when in builder mode.
      if (this.options.builder) {
        return;
      }

      if (!fromBuild && !this.editRows.length && this.component.defaultOpen) {
        return this.addRow(true);
      }

      var tableClass = 'editgrid-listgroup list-group ';
      ['striped', 'bordered', 'hover', 'condensed'].forEach(function (prop) {
        if (_this3.component[prop]) {
          tableClass += "table-".concat(prop, " ");
        }
      });
      var tableElement = this.ce('ul', {
        class: tableClass
      }, [this.headerElement = this.createHeader(), this.rowElements = this.editRows.map(this.createRow.bind(this)), this.footerElement = this.createFooter()]);

      if (this.tableElement && this.element.contains(this.tableElement)) {
        this.element.replaceChild(tableElement, this.tableElement);
      } else {
        this.element.appendChild(tableElement);
      } //add open class to the element if any edit grid row is open


      var isAnyRowOpen = this.editRows.some(function (row) {
        return row.isOpen;
      });

      if (isAnyRowOpen) {
        this.addClass(this.element, "formio-component-".concat(this.component.type, "-row-open"));
      } else {
        this.removeClass(this.element, "formio-component-".concat(this.component.type, "-row-open"));
      }

      this.tableElement = tableElement;
    }
  }, {
    key: "createHeader",
    value: function createHeader() {
      var templateHeader = _lodash.default.get(this.component, 'templates.header');

      if (!templateHeader) {
        return this.text('');
      }

      return this.ce('li', {
        class: 'list-group-item list-group-header'
      }, this.renderTemplate(templateHeader, {
        components: this.component.components,
        value: this.dataValue
      }));
    }
  }, {
    key: "createRow",
    value: function createRow(row, rowIndex) {
      var _this4 = this;

      var wrapper = this.ce('li', {
        class: 'list-group-item'
      });

      var rowTemplate = _lodash.default.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate); // Store info so we can detect changes later.


      wrapper.rowData = row.data;
      wrapper.rowIndex = rowIndex;
      wrapper.rowOpen = row.isOpen;
      row.components = [];

      if (wrapper.rowOpen) {
        var editForm = this.component.components.map(function (comp) {
          var component = _lodash.default.cloneDeep(comp);

          var options = _lodash.default.clone(_this4.options);

          options.row = "".concat(_this4.row, "-").concat(rowIndex);
          options.name += "[".concat(rowIndex, "]");

          var instance = _this4.createComponent(component, options, row.data);

          instance.rowIndex = rowIndex;
          row.components.push(instance);
          return instance.element;
        });

        if (!this.options.readOnly) {
          editForm.push(this.ce('div', {
            class: 'editgrid-actions'
          }, [this.ce('button', {
            class: 'btn btn-primary',
            onClick: this.saveRow.bind(this, rowIndex)
          }, this.component.saveRow || 'Save'), ' ', this.component.removeRow ? this.ce('button', {
            class: 'btn btn-danger',
            onClick: this.cancelRow.bind(this, rowIndex)
          }, this.component.removeRow || 'Cancel') : null]));
        }

        wrapper.appendChild(this.ce('div', {
          class: 'editgrid-edit'
        }, this.ce('div', {
          class: 'editgrid-body'
        }, editForm)));
      } else {
        wrapper.appendChild(this.renderTemplate(rowTemplate, {
          row: row.data,
          data: this.data,
          rowIndex: rowIndex,
          components: this.component.components,
          getView: function getView(component, data) {
            return _Components.default.create(component, _this4.options, data, true).getView(data);
          }
        }, [{
          class: 'removeRow',
          event: 'click',
          action: this.removeRow.bind(this, rowIndex)
        }, {
          class: 'editRow',
          event: 'click',
          action: this.editRow.bind(this, rowIndex)
        }]));
      }

      wrapper.appendChild(row.errorContainer = this.ce('div', {
        class: 'has-error'
      }));
      this.checkData(this.data, {
        noValidate: true
      }, rowIndex);
      return wrapper;
    }
  }, {
    key: "createFooter",
    value: function createFooter() {
      var footerTemplate = _lodash.default.get(this.component, 'templates.footer');

      if (!footerTemplate) {
        return this.text('');
      }

      return this.ce('li', {
        class: 'list-group-item list-group-footer'
      }, this.renderTemplate(footerTemplate, {
        components: this.component.components,
        value: this.dataValue
      }));
    }
  }, {
    key: "checkData",
    value: function checkData(data) {
      var _this5 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var index = arguments.length > 2 ? arguments[2] : undefined;
      var valid = true;

      if (flags.noCheck) {
        return;
      } // Update the value.


      var changed = this.updateValue({
        noUpdateEvent: true
      }); // Iterate through all components and check conditions, and calculate values.

      this.editRows[index].components.forEach(function (comp) {
        changed |= comp.calculateValue(data, {
          noUpdateEvent: true
        });
        comp.checkConditions(data);

        if (!flags.noValidate) {
          valid &= comp.checkValidity(data, !_this5.editRows[index].isOpen);
        }
      });
      valid &= this.validateRow(index); // Trigger the change if the values changed.

      if (changed) {
        this.triggerChange(flags);
      } // Return if the value is valid.


      return valid;
    }
  }, {
    key: "createAddButton",
    value: function createAddButton() {
      if (this.options.readOnly) {
        return;
      }

      this.element.appendChild(this.ce('div', {
        class: 'editgrid-add'
      }, this.ce('button', {
        class: 'btn btn-primary',
        role: 'button',
        onClick: this.addRow.bind(this)
      }, [this.ce('span', {
        class: this.iconClass('plus'),
        'aria-hidden': true
      }), ' ', this.t(this.component.addAnother ? this.component.addAnother : 'Add Another', {})])));
    }
  }, {
    key: "addRow",
    value: function addRow(fromBuild) {
      if (this.options.readOnly) {
        return;
      }

      this.editRows.push({
        components: [],
        isOpen: true,
        data: {}
      });
      this.emit('editGridAddRow', {
        component: this.component,
        row: this.editRows[this.editRows.length - 1]
      });
      this.buildTable(fromBuild);
    }
  }, {
    key: "editRow",
    value: function editRow(rowIndex) {
      this.editRows[rowIndex].dirty = false;
      this.editRows[rowIndex].isOpen = true;
      this.editRows[rowIndex].editing = true;
      this.editRows[rowIndex].data = _lodash.default.cloneDeep(this.dataValue[rowIndex]);
      this.buildTable();
    }
  }, {
    key: "updateGrid",
    value: function updateGrid() {
      this.updateValue();
      this.triggerChange();
      this.buildTable();
    }
  }, {
    key: "clearErrors",
    value: function clearErrors(rowIndex) {
      if (this.editRows[rowIndex] && Array.isArray(this.editRows[rowIndex].components)) {
        this.editRows[rowIndex].components.forEach(function (comp) {
          comp.setPristine(true);
          comp.setCustomValidity('');
        });
      }
    }
  }, {
    key: "cancelRow",
    value: function cancelRow(rowIndex) {
      if (this.options.readOnly) {
        this.editRows[rowIndex].dirty = false;
        this.editRows[rowIndex].isOpen = false;
        this.buildTable();
        return;
      }

      if (this.editRows[rowIndex].editing) {
        this.editRows[rowIndex].dirty = false;
        this.editRows[rowIndex].isOpen = false;
        this.editRows[rowIndex].data = this.dataValue[rowIndex];
        this.clearErrors(rowIndex);
      } else {
        this.clearErrors(rowIndex);
        this.removeChildFrom(this.editRows[rowIndex].element, this.tableElement);
        this.editRows.splice(rowIndex, 1);
      }

      this.updateGrid();
    }
  }, {
    key: "saveRow",
    value: function saveRow(rowIndex) {
      if (this.options.readOnly) {
        this.editRows[rowIndex].dirty = false;
        this.editRows[rowIndex].isOpen = false;
        this.buildTable();
        return;
      }

      this.editRows[rowIndex].dirty = true;

      if (!this.validateRow(rowIndex)) {
        return;
      }

      if (this.editRows[rowIndex].editing) {
        this.dataValue[rowIndex] = this.editRows[rowIndex].data;
      } else {
        // Insert this row into its proper place.
        var newIndex = this.dataValue.length;
        var row = this.editRows[rowIndex];
        this.dataValue.push(row.data);
        this.editRows.splice(rowIndex, 1);
        this.editRows.splice(newIndex, 0, row);
        rowIndex = newIndex;
      }

      this.editRows[rowIndex].dirty = false;
      this.editRows[rowIndex].isOpen = false;
      this.updateGrid();
    }
  }, {
    key: "removeRow",
    value: function removeRow(rowIndex) {
      if (this.options.readOnly) {
        return;
      }

      this.splice(rowIndex);
      this.removeChildFrom(this.editRows[rowIndex].element, this.tableElement);
      this.editRows.splice(rowIndex, 1);
      this.updateGrid();
    }
  }, {
    key: "removeRowComponents",
    value: function removeRowComponents(rowIndex) {
      var _this6 = this;

      // Clean up components list.
      this.editRows[rowIndex].components.forEach(function (comp) {
        _this6.removeComponent(comp, _this6.components);
      });
      this.editRows[rowIndex].components = [];
    }
  }, {
    key: "validateRow",
    value: function validateRow(rowIndex, dirty) {
      var _this7 = this;

      var check = true;
      var isDirty = dirty || !!this.editRows[rowIndex].dirty;
      this.editRows[rowIndex].components.forEach(function (comp) {
        comp.setPristine(!isDirty);
        check &= comp.checkValidity(null, isDirty, _this7.editRows[rowIndex].data);
      });

      if (this.component.validate && this.component.validate.row) {
        var valid = this.evaluate(this.component.validate.row, {
          valid: true,
          row: this.editRows[rowIndex].data
        }, 'valid', true);

        if (valid === null) {
          valid = "Invalid row validation for ".concat(this.key);
        }

        this.editRows[rowIndex].errorContainer.innerHTML = '';

        if (valid !== true) {
          this.editRows[rowIndex].errorContainer.appendChild(this.ce('div', {
            class: 'editgrid-row-error help-block'
          }, valid));
          return false;
        }
      }

      return check;
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      var _this8 = this;

      if (!this.checkCondition(null, data)) {
        this.setCustomValidity('');
        return true;
      }

      var rowsValid = true;
      var rowsClosed = true;
      this.editRows.forEach(function (editRow, rowIndex) {
        // Trigger all errors on the row.
        var rowValid = _this8.validateRow(rowIndex, dirty); // Add has-error class to row.


        if (!rowValid) {
          _this8.addClass(_this8.editRows[rowIndex].element, 'has-error');
        } else {
          _this8.removeClass(_this8.editRows[rowIndex].element, 'has-error');
        }

        rowsValid &= rowValid; // Any open rows causes validation to fail.

        if (dirty) {
          rowsClosed &= !editRow.isOpen;
        }
      });

      if (!rowsValid) {
        this.setCustomValidity('Please correct rows before proceeding.', dirty);
        return false;
      } else if (!rowsClosed) {
        this.setCustomValidity('Please save all rows before proceeding.', dirty);
        return false;
      }

      var message = this.invalid || this.invalidMessage(data, dirty);
      this.setCustomValidity(message, dirty);
      return true;
    }
  }, {
    key: "setCustomValidity",
    value: function setCustomValidity(message, dirty) {
      if (this.errorElement && this.errorContainer) {
        this.errorElement.innerHTML = '';
        this.removeChildFrom(this.errorElement, this.errorContainer);
      }

      this.removeClass(this.element, 'has-error');

      if (this.options.highlightErrors) {
        this.removeClass(this.element, 'alert alert-danger');
      }

      if (message) {
        this.emit('componentError', this.error);
        this.createErrorElement();
        var errorMessage = this.ce('p', {
          class: 'help-block'
        });
        errorMessage.appendChild(this.text(message));
        this.appendTo(errorMessage, this.errorElement); // Add error classes

        this.addClass(this.element, 'has-error');

        if (dirty && this.options.highlightErrors) {
          this.addClass(this.element, 'alert alert-danger');
        }
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Base.default.prototype.updateValue.call(this, flags, value);
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this9 = this;

      if (!value) {
        this.editRows = this.defaultValue;
        this.buildTable();
        return;
      }

      if (!Array.isArray(value)) {
        if (_typeof(value) === 'object') {
          value = [value];
        } else {
          return;
        }
      }

      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value; // Refresh editRow data when data changes.

      this.dataValue.forEach(function (row, rowIndex) {
        if (_this9.editRows[rowIndex]) {
          _this9.editRows[rowIndex].data = row;
        } else {
          _this9.editRows[rowIndex] = {
            components: [],
            isOpen: !!_this9.options.defaultOpen,
            data: row
          };
        }
      }); // Remove any extra edit rows.

      if (this.dataValue.length < this.editRows.length) {
        for (var rowIndex = this.editRows.length - 1; rowIndex >= this.dataValue.length; rowIndex--) {
          this.removeChildFrom(this.editRows[rowIndex].element, this.tableElement);
          this.editRows.splice(rowIndex, 1);
        }
      }

      this.buildTable();
      return changed;
    }
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
    key: "clearOnHide",
    value: function clearOnHide(show) {
      _get(_getPrototypeOf(EditGridComponent.prototype), "clearOnHide", this).call(this, show);

      if (!this.component.clearOnHide) {
        // If some components set to clearOnHide we need to clear them.
        this.buildTable();
      }
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      return;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return EditGridComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [];
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(EditGridComponent.prototype), "defaultValue", this);

      return Array.isArray(value) ? value : [];
    }
  }]);

  return EditGridComponent;
}(_NestedComponent2.default);

exports.default = EditGridComponent;