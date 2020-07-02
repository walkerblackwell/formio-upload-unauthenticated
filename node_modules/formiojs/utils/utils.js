"use strict";

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  evaluate: true,
  getRandomComponentId: true,
  getPropertyValue: true,
  getElementRect: true,
  boolValue: true,
  isMongoId: true,
  checkCalculated: true,
  checkSimpleConditional: true,
  checkCustomConditional: true,
  checkJsonConditional: true,
  checkCondition: true,
  checkTrigger: true,
  setActionProperty: true,
  interpolate: true,
  uniqueName: true,
  guid: true,
  getDateSetting: true,
  isValidDate: true,
  currentTimezone: true,
  offsetDate: true,
  zonesLoaded: true,
  shouldLoadZones: true,
  loadZones: true,
  momentDate: true,
  formatDate: true,
  formatOffset: true,
  getLocaleDateFormatInfo: true,
  convertFormatToFlatpickr: true,
  convertFormatToMoment: true,
  convertFormatToMask: true,
  getInputMask: true,
  matchInputMask: true,
  getNumberSeparators: true,
  getNumberDecimalLimit: true,
  getCurrencyAffixes: true,
  fieldData: true,
  delay: true,
  iterateKey: true,
  uniqueKey: true,
  bootstrapVersion: true,
  jsonLogic: true,
  moment: true
};
exports.evaluate = evaluate;
exports.getRandomComponentId = getRandomComponentId;
exports.getPropertyValue = getPropertyValue;
exports.getElementRect = getElementRect;
exports.boolValue = boolValue;
exports.isMongoId = isMongoId;
exports.checkCalculated = checkCalculated;
exports.checkSimpleConditional = checkSimpleConditional;
exports.checkCustomConditional = checkCustomConditional;
exports.checkJsonConditional = checkJsonConditional;
exports.checkCondition = checkCondition;
exports.checkTrigger = checkTrigger;
exports.setActionProperty = setActionProperty;
exports.interpolate = interpolate;
exports.uniqueName = uniqueName;
exports.guid = guid;
exports.getDateSetting = getDateSetting;
exports.isValidDate = isValidDate;
exports.currentTimezone = currentTimezone;
exports.offsetDate = offsetDate;
exports.zonesLoaded = zonesLoaded;
exports.shouldLoadZones = shouldLoadZones;
exports.loadZones = loadZones;
exports.momentDate = momentDate;
exports.formatDate = formatDate;
exports.formatOffset = formatOffset;
exports.getLocaleDateFormatInfo = getLocaleDateFormatInfo;
exports.convertFormatToFlatpickr = convertFormatToFlatpickr;
exports.convertFormatToMoment = convertFormatToMoment;
exports.convertFormatToMask = convertFormatToMask;
exports.getInputMask = getInputMask;
exports.matchInputMask = matchInputMask;
exports.getNumberSeparators = getNumberSeparators;
exports.getNumberDecimalLimit = getNumberDecimalLimit;
exports.getCurrencyAffixes = getCurrencyAffixes;
exports.fieldData = fieldData;
exports.delay = delay;
exports.iterateKey = iterateKey;
exports.uniqueKey = uniqueKey;
exports.bootstrapVersion = bootstrapVersion;
Object.defineProperty(exports, "jsonLogic", {
  enumerable: true,
  get: function get() {
    return _jsonLogicJs.default;
  }
});
Object.defineProperty(exports, "moment", {
  enumerable: true,
  get: function get() {
    return _momentTimezone.default;
  }
});

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

var _lodash = _interopRequireDefault(require("lodash"));

require("whatwg-fetch");

var _jsonLogicJs = _interopRequireDefault(require("json-logic-js"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone/moment-timezone"));

var _jstimezonedetect = _interopRequireDefault(require("jstimezonedetect"));

var _operators = require("./jsonlogic/operators");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _formUtils = require("./formUtils");

Object.keys(_formUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _formUtils[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Configure JsonLogic
_operators.lodashOperators.forEach(function (name) {
  return _jsonLogicJs.default.add_operation("_".concat(name), _lodash.default[name]);
}); // Retrieve Any Date


_jsonLogicJs.default.add_operation('getDate', function (date) {
  return (0, _momentTimezone.default)(date).toISOString();
}); // Set Relative Minimum Date


_jsonLogicJs.default.add_operation('relativeMinDate', function (relativeMinDate) {
  return (0, _momentTimezone.default)().subtract(relativeMinDate, 'days').toISOString();
}); // Set Relative Maximum Date


_jsonLogicJs.default.add_operation('relativeMaxDate', function (relativeMaxDate) {
  return (0, _momentTimezone.default)().add(relativeMaxDate, 'days').toISOString();
});

/**
 * Evaluate a method.
 *
 * @param func
 * @param args
 * @return {*}
 */
function evaluate(func, args, ret, tokenize) {
  var returnVal = null;
  var component = args.component ? args.component : {
    key: 'unknown'
  };

  if (!args.form && args.instance) {
    args.form = _lodash.default.get(args.instance, 'root._form', {});
  }

  if (typeof func === 'string') {
    if (ret) {
      func += ";return ".concat(ret);
    }

    var params = _lodash.default.keys(args);

    if (tokenize) {
      // Replace all {{ }} references with actual data.
      func = func.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
        if ($2.indexOf('data.') === 0) {
          return _lodash.default.get(args.data, $2.replace('data.', ''));
        } else if ($2.indexOf('row.') === 0) {
          return _lodash.default.get(args.row, $2.replace('row.', ''));
        } // Support legacy...


        return _lodash.default.get(args.data, $2);
      });
    }

    try {
      func = _construct(Function, _toConsumableArray(params).concat([func]));
      args = _lodash.default.values(args);
    } catch (err) {
      console.warn("An error occured within the custom function for ".concat(component.key), err);
      returnVal = null;
      func = false;
    }
  }

  if (typeof func === 'function') {
    try {
      returnVal = Array.isArray(args) ? func.apply(void 0, _toConsumableArray(args)) : func(args);
    } catch (err) {
      returnVal = null;
      console.warn("An error occured within custom function for ".concat(component.key), err);
    }
  } else if (_typeof(func) === 'object') {
    try {
      returnVal = _jsonLogicJs.default.apply(func, args);
    } catch (err) {
      returnVal = null;
      console.warn("An error occured within custom function for ".concat(component.key), err);
    }
  } else if (func) {
    console.warn("Unknown function type for ".concat(component.key));
  }

  return returnVal;
}

function getRandomComponentId() {
  return "e".concat(Math.random().toString(36).substring(7));
}
/**
 * Get a property value of an element.
 *
 * @param style
 * @param prop
 * @return {number}
 */


function getPropertyValue(style, prop) {
  var value = style.getPropertyValue(prop);
  value = value ? value.replace(/[^0-9.]/g, '') : '0';
  return parseFloat(value);
}
/**
 * Get an elements bounding rectagle.
 *
 * @param element
 * @return {{x: string, y: string, width: string, height: string}}
 */


function getElementRect(element) {
  var style = window.getComputedStyle(element, null);
  return {
    x: getPropertyValue(style, 'left'),
    y: getPropertyValue(style, 'top'),
    width: getPropertyValue(style, 'width'),
    height: getPropertyValue(style, 'height')
  };
}
/**
 * Determines the boolean value of a setting.
 *
 * @param value
 * @return {boolean}
 */


function boolValue(value) {
  if (_lodash.default.isBoolean(value)) {
    return value;
  } else if (_lodash.default.isString(value)) {
    return value.toLowerCase() === 'true';
  } else {
    return !!value;
  }
}
/**
 * Check to see if an ID is a mongoID.
 * @param text
 * @return {Array|{index: number, input: string}|Boolean|*}
 */


function isMongoId(text) {
  return text.toString().match(/^[0-9a-fA-F]{24}$/);
}
/**
 * Checks the calculated value for a provided component and data.
 *
 * @param {Object} component
 *   The component to check for the calculated value.
 * @param {Object} submission
 *   A submission object.
 * @param data
 *   The full submission data.
 */


function checkCalculated(component, submission, rowData) {
  // Process calculated value stuff if present.
  if (component.calculateValue) {
    _lodash.default.set(rowData, component.key, evaluate(component.calculateValue, {
      value: undefined,
      data: submission ? submission.data : rowData,
      row: rowData,
      util: this,
      component: component
    }, 'value'));
  }
}
/**
 * Check if a simple conditional evaluates to true.
 *
 * @param condition
 * @param condition
 * @param row
 * @param data
 * @returns {boolean}
 */


function checkSimpleConditional(component, condition, row, data) {
  var value = null;

  if (row) {
    value = (0, _formUtils.getValue)({
      data: row
    }, condition.when);
  }

  if (data && _lodash.default.isNil(value)) {
    value = (0, _formUtils.getValue)({
      data: data
    }, condition.when);
  } // FOR-400 - Fix issue where falsey values were being evaluated as show=true


  if (_lodash.default.isNil(value)) {
    value = '';
  }

  var eq = String(condition.eq);
  var show = String(condition.show); // Special check for selectboxes component.

  if (_lodash.default.isObject(value) && _lodash.default.has(value, condition.eq)) {
    return String(value[condition.eq]) === show;
  } // FOR-179 - Check for multiple values.


  if (Array.isArray(value) && value.map(String).includes(eq)) {
    return show === 'true';
  }

  return String(value) === eq === (show === 'true');
}
/**
 * Check custom javascript conditional.
 *
 * @param component
 * @param custom
 * @param row
 * @param data
 * @returns {*}
 */


function checkCustomConditional(component, custom, row, data, form, variable, onError, instance) {
  if (typeof custom === 'string') {
    custom = "var ".concat(variable, " = true; ").concat(custom, "; return ").concat(variable, ";");
  }

  var value = instance && instance.evaluate ? instance.evaluate(custom) : evaluate(custom, {
    row: row,
    data: data,
    form: form
  });

  if (value === null) {
    return onError;
  }

  return value;
}

function checkJsonConditional(component, json, row, data, form, onError) {
  try {
    return _jsonLogicJs.default.apply(json, {
      data: data,
      row: row,
      form: form,
      _: _lodash.default
    });
  } catch (err) {
    console.warn("An error occurred in jsonLogic advanced condition for ".concat(component.key), err);
    return onError;
  }
}
/**
 * Checks the conditions for a provided component and data.
 *
 * @param component
 *   The component to check for the condition.
 * @param row
 *   The data within a row
 * @param data
 *   The full submission data.
 *
 * @returns {boolean}
 */


function checkCondition(component, row, data, form, instance) {
  if (component.customConditional) {
    return checkCustomConditional(component, component.customConditional, row, data, form, 'show', true, instance);
  } else if (component.conditional && component.conditional.when) {
    return checkSimpleConditional(component, component.conditional, row, data, true);
  } else if (component.conditional && component.conditional.json) {
    return checkJsonConditional(component, component.conditional.json, row, data, form, instance);
  } // Default to show.


  return true;
}
/**
 * Test a trigger on a component.
 *
 * @param component
 * @param action
 * @param data
 * @param row
 * @returns {mixed}
 */


function checkTrigger(component, trigger, row, data, form, instance) {
  switch (trigger.type) {
    case 'simple':
      return checkSimpleConditional(component, trigger.simple, row, data);

    case 'javascript':
      return checkCustomConditional(component, trigger.javascript, row, data, form, 'result', false, instance);

    case 'json':
      return checkJsonConditional(component, trigger.json, row, data, form, false);
  } // If none of the types matched, don't fire the trigger.


  return false;
}

function setActionProperty(component, action, row, data, result, instance) {
  switch (action.property.type) {
    case 'boolean':
      if (_lodash.default.get(component, action.property.value, false).toString() !== action.state.toString()) {
        _lodash.default.set(component, action.property.value, action.state.toString() === 'true');
      }

      break;

    case 'string':
      {
        var evalData = {
          data: data,
          row: row,
          component: component,
          result: result
        };
        var textValue = action.property.component ? action[action.property.component] : action.text;
        var newValue = instance && instance.interpolate ? instance.interpolate(textValue, evalData) : interpolate(textValue, evalData);

        if (newValue !== _lodash.default.get(component, action.property.value, '')) {
          _lodash.default.set(component, action.property.value, newValue);
        }

        break;
      }
  }

  return component;
}
/**
 * Interpolate a string and add data replacements.
 *
 * @param string
 * @param data
 * @returns {XML|string|*|void}
 */


function interpolate(string, data) {
  var templateSettings = {
    evaluate: /\{%(.+?)%\}/g,
    interpolate: /\{\{(.+?)\}\}/g,
    escape: /\{\{\{(.+?)\}\}\}/g
  };

  try {
    return _lodash.default.template(string, templateSettings)(data);
  } catch (err) {
    console.warn('Error interpolating template', err, string, data);
  }
}
/**
 * Make a filename guaranteed to be unique.
 * @param name
 * @returns {string}
 */


function uniqueName(name) {
  var parts = name.toLowerCase().replace(/[^0-9a-z.]/g, '').split('.');
  var fileName = parts[0];
  var ext = parts.length > 1 ? ".".concat(_lodash.default.last(parts)) : '';
  return "".concat(fileName.substr(0, 10), "-").concat(guid()).concat(ext);
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 * Return a translated date setting.
 *
 * @param date
 * @return {(null|Date)}
 */


function getDateSetting(date) {
  if (_lodash.default.isNil(date) || _lodash.default.isNaN(date) || date === '') {
    return null;
  }

  if (date instanceof Date) {
    return date;
  } else if (typeof date.toDate === 'function') {
    return date.isValid() ? date.toDate() : null;
  }

  var dateSetting = typeof date !== 'string' || date.indexOf('moment(') === -1 ? (0, _momentTimezone.default)(date) : null;

  if (dateSetting && dateSetting.isValid()) {
    return dateSetting.toDate();
  }

  dateSetting = null;

  try {
    var value = new Function('moment', "return ".concat(date, ";"))(_momentTimezone.default);

    if (typeof value === 'string') {
      dateSetting = (0, _momentTimezone.default)(value);
    } else if (typeof value.toDate === 'function') {
      dateSetting = (0, _momentTimezone.default)(value.toDate().toUTCString());
    } else if (value instanceof Date) {
      dateSetting = (0, _momentTimezone.default)(value);
    }
  } catch (e) {
    return null;
  }

  if (!dateSetting) {
    return null;
  } // Ensure this is a date.


  if (!dateSetting.isValid()) {
    return null;
  }

  return dateSetting.toDate();
}

function isValidDate(date) {
  return _lodash.default.isDate(date) && !_lodash.default.isNaN(date.getDate());
}
/**
 * Get the current timezone string.
 *
 * @return {string}
 */


function currentTimezone() {
  if (_momentTimezone.default.currentTimezone) {
    return _momentTimezone.default.currentTimezone;
  }

  _momentTimezone.default.currentTimezone = _jstimezonedetect.default.determine().name();
  return _momentTimezone.default.currentTimezone;
}
/**
 * Get an offset date provided a date object and timezone object.
 *
 * @param date
 * @param timezone
 * @return {Date}
 */


function offsetDate(date, timezone) {
  if (timezone === 'UTC') {
    return {
      date: new Date(date.getTime() + date.getTimezoneOffset() * 60000),
      abbr: 'UTC'
    };
  }

  var dateMoment = (0, _momentTimezone.default)(date).tz(timezone);
  return {
    date: new Date(date.getTime() + (dateMoment.utcOffset() + date.getTimezoneOffset()) * 60000),
    abbr: dateMoment.format('z')
  };
}
/**
 * Returns if the zones are loaded.
 *
 * @return {boolean}
 */


function zonesLoaded() {
  return _momentTimezone.default.zonesLoaded;
}
/**
 * Returns if we should load the zones.
 *
 * @param timezone
 * @return {boolean}
 */


function shouldLoadZones(timezone) {
  if (timezone === currentTimezone() || timezone === 'UTC') {
    return false;
  }

  return true;
}
/**
 * Externally load the timezone data.
 *
 * @return {Promise<any> | *}
 */


function loadZones(timezone) {
  if (timezone && !shouldLoadZones(timezone)) {
    // Return non-resolving promise.
    return new _nativePromiseOnly.default(_lodash.default.noop);
  }

  if (_momentTimezone.default.zonesPromise) {
    return _momentTimezone.default.zonesPromise;
  }

  return _momentTimezone.default.zonesPromise = fetch('https://cdn.rawgit.com/moment/moment-timezone/develop/data/packed/latest.json').then(function (resp) {
    return resp.json().then(function (zones) {
      _momentTimezone.default.tz.load(zones);

      _momentTimezone.default.zonesLoaded = true; // Trigger a global event that the timezones have finished loading.

      if (document && document.createEvent && document.body && document.body.dispatchEvent) {
        var event = document.createEvent('Event');
        event.initEvent('zonesLoaded', true, true);
        document.body.dispatchEvent(event);
      }
    });
  });
}
/**
 * Get the moment date object for translating dates with timezones.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {*}
 */


function momentDate(value, format, timezone) {
  var momentDate = (0, _momentTimezone.default)(value);

  if (timezone === 'UTC') {
    timezone = 'Etc/UTC';
  }

  if ((timezone !== currentTimezone() || format && format.match(/\s(z$|z\s)/)) && _momentTimezone.default.zonesLoaded) {
    return momentDate.tz(timezone);
  }

  return momentDate;
}
/**
 * Format a date provided a value, format, and timezone object.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {string}
 */


function formatDate(value, format, timezone) {
  var momentDate = (0, _momentTimezone.default)(value);

  if (timezone === currentTimezone()) {
    // See if our format contains a "z" timezone character.
    if (format.match(/\s(z$|z\s)/)) {
      loadZones();

      if (_momentTimezone.default.zonesLoaded) {
        return momentDate.tz(timezone).format(convertFormatToMoment(format));
      } else {
        return momentDate.format(convertFormatToMoment(format.replace(/\s(z$|z\s)/, '')));
      }
    } // Return the standard format.


    return momentDate.format(convertFormatToMoment(format));
  }

  if (timezone === 'UTC') {
    var offset = offsetDate(momentDate.toDate(), 'UTC');
    return "".concat((0, _momentTimezone.default)(offset.date).format(convertFormatToMoment(format)), " UTC");
  } // Load the zones since we need timezone information.


  loadZones();

  if (_momentTimezone.default.zonesLoaded) {
    return momentDate.tz(timezone).format("".concat(convertFormatToMoment(format), " z"));
  } else {
    return momentDate.format(convertFormatToMoment(format));
  }
}
/**
 * Pass a format function to format within a timezone.
 *
 * @param formatFn
 * @param date
 * @param format
 * @param timezone
 * @return {string}
 */


function formatOffset(formatFn, date, format, timezone) {
  if (timezone === currentTimezone()) {
    return formatFn(date, format);
  }

  if (timezone === 'UTC') {
    return "".concat(formatFn(offsetDate(date, 'UTC').date, format), " UTC");
  } // Load the zones since we need timezone information.


  loadZones();

  if (_momentTimezone.default.zonesLoaded) {
    var offset = offsetDate(date, timezone);
    return "".concat(formatFn(offset.date, format), " ").concat(offset.abbr);
  } else {
    return formatFn(date, format);
  }
}

function getLocaleDateFormatInfo(locale) {
  var formatInfo = {};
  var day = 21;
  var exampleDate = new Date(2017, 11, day);
  var localDateString = exampleDate.toLocaleDateString(locale);
  formatInfo.dayFirst = localDateString.slice(0, 2) === day.toString();
  return formatInfo;
}
/**
 * Convert the format from the angular-datepicker module to flatpickr format.
 * @param format
 * @return {string}
 */


function convertFormatToFlatpickr(format) {
  return format // Remove the Z timezone offset, not supported by flatpickr.
  .replace(/Z/g, '') // Year conversion.
  .replace(/y/g, 'Y').replace('YYYY', 'Y').replace('YY', 'y') // Month conversion.
  .replace('MMMM', 'F').replace(/M/g, 'n').replace('nnn', 'M').replace('nn', 'm') // Day in month.
  .replace(/d/g, 'j').replace(/jj/g, 'd') // Day in week.
  .replace('EEEE', 'l').replace('EEE', 'D') // Hours, minutes, seconds
  .replace('HH', 'H').replace('hh', 'h').replace('mm', 'i').replace('ss', 'S').replace(/a/g, 'K');
}
/**
 * Convert the format from the angular-datepicker module to moment format.
 * @param format
 * @return {string}
 */


function convertFormatToMoment(format) {
  return format // Year conversion.
  .replace(/y/g, 'Y') // Day in month.
  .replace(/d/g, 'D') // Day in week.
  .replace(/E/g, 'd') // AM/PM marker
  .replace(/a/g, 'A');
}

function convertFormatToMask(format) {
  return format // Short and long month replacement.
  .replace(/(MMM|MMMM)/g, 'MM') // Year conversion
  .replace(/[ydhmsHM]/g, '9') // AM/PM conversion
  .replace(/a/g, 'AA');
}
/**
 * Returns an input mask that is compatible with the input mask library.
 * @param {string} mask - The Form.io input mask.
 * @returns {Array} - The input mask for the mask library.
 */


function getInputMask(mask) {
  if (mask instanceof Array) {
    return mask;
  }

  var maskArray = [];
  maskArray.numeric = true;

  for (var i = 0; i < mask.length; i++) {
    switch (mask[i]) {
      case '9':
        maskArray.push(/\d/);
        break;

      case 'A':
        maskArray.numeric = false;
        maskArray.push(/[a-zA-Z]/);
        break;

      case 'a':
        maskArray.numeric = false;
        maskArray.push(/[a-z]/);
        break;

      case '*':
        maskArray.numeric = false;
        maskArray.push(/[a-zA-Z0-9]/);
        break;

      default:
        maskArray.push(mask[i]);
        break;
    }
  }

  return maskArray;
}

function matchInputMask(value, inputMask) {
  if (!inputMask) {
    return true;
  }

  for (var i = 0; i < inputMask.length; i++) {
    var char = value[i];
    var charPart = inputMask[i];

    if (!(_lodash.default.isRegExp(charPart) && charPart.test(char) || charPart === char)) {
      return false;
    }
  }

  return true;
}

function getNumberSeparators() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
  var formattedNumberString = 12345.6789.toLocaleString(lang);
  var delimeters = formattedNumberString.match(/..(.)...(.)../);

  if (!delimeters) {
    return {
      delimiter: ',',
      decimalSeparator: '.'
    };
  }

  return {
    delimiter: delimeters.length > 1 ? delimeters[1] : ',',
    decimalSeparator: delimeters.length > 2 ? delimeters[2] : '.'
  };
}

function getNumberDecimalLimit(component) {
  // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
  var decimalLimit = 20;

  var step = _lodash.default.get(component, 'validate.step', 'any');

  if (step !== 'any') {
    var parts = step.toString().split('.');

    if (parts.length > 1) {
      decimalLimit = parts[1].length;
    }
  }

  return decimalLimit;
}

function getCurrencyAffixes(_ref) {
  var _ref$currency = _ref.currency,
      currency = _ref$currency === void 0 ? 'USD' : _ref$currency,
      decimalLimit = _ref.decimalLimit,
      decimalSeparator = _ref.decimalSeparator,
      lang = _ref.lang;
  // Get the prefix and suffix from the localized string.
  var regex = '(.*)?100';

  if (decimalLimit) {
    regex += "".concat(decimalSeparator === '.' ? '\\.' : decimalSeparator, "0{").concat(decimalLimit, "}");
  }

  regex += '(.*)?';
  var parts = 100 .toLocaleString(lang, {
    style: 'currency',
    currency: currency,
    useGrouping: true,
    maximumFractionDigits: decimalLimit,
    minimumFractionDigits: decimalLimit
  }).replace('.', decimalSeparator).match(new RegExp(regex));
  return {
    prefix: parts[1] || '',
    suffix: parts[2] || ''
  };
}
/**
 * Fetch the field data provided a component.
 *
 * @param data
 * @param component
 * @return {*}
 */


function fieldData(data, component) {
  if (!data) {
    return '';
  }

  if (!component || !component.key) {
    return data;
  }

  if (component.key.includes('.')) {
    var value = data;
    var parts = component.key.split('.');
    var key = '';

    for (var i = 0; i < parts.length; i++) {
      key = parts[i]; // Handle nested resources

      if (value.hasOwnProperty('_id')) {
        value = value.data;
      } // Return if the key is not found on the value.


      if (!value.hasOwnProperty(key)) {
        return;
      } // Convert old single field data in submissions to multiple


      if (key === parts[parts.length - 1] && component.multiple && !Array.isArray(value[key])) {
        value[key] = [value[key]];
      } // Set the value of this key.


      value = value[key];
    }

    return value;
  } else {
    // Convert old single field data in submissions to multiple
    if (component.multiple && !Array.isArray(data[component.key])) {
      data[component.key] = [data[component.key]];
    }

    return data[component.key];
  }
}
/**
 * Delays function execution with possibility to execute function synchronously or cancel it.
 *
 * @param fn Function to delay
 * @param delay Delay time
 * @return {*}
 */


function delay(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var timer = setTimeout.apply(void 0, [fn, delay].concat(args));

  function cancel() {
    clearTimeout(timer);
  }

  function earlyCall() {
    cancel();
    return fn.apply(void 0, args);
  }

  earlyCall.timer = timer;
  earlyCall.cancel = cancel;
  return earlyCall;
}
/**
 * Iterate the given key to make it unique.
 *
 * @param {String} key
 *   Modify the component key to be unique.
 *
 * @returns {String}
 *   The new component key.
 */


function iterateKey(key) {
  if (!key.match(/(\d+)$/)) {
    return "".concat(key, "2");
  }

  return key.replace(/(\d+)$/, function (suffix) {
    return Number(suffix) + 1;
  });
}
/**
 * Determines a unique key within a map provided the base key.
 *
 * @param map
 * @param base
 * @return {*}
 */


function uniqueKey(map, base) {
  var newKey = base;

  while (map.hasOwnProperty(newKey)) {
    newKey = iterateKey(newKey);
  }

  return newKey;
}
/**
 * Determines the major version number of bootstrap.
 *
 * @return {number}
 */


function bootstrapVersion() {
  if (typeof $ === 'function' && typeof $().collapse === 'function') {
    return parseInt($.fn.collapse.Constructor.VERSION.split('.')[0], 10);
  }

  return 0;
}