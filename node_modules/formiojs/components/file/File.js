"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.regexp.split");

var _Base = _interopRequireDefault(require("../base/Base"));

var _utils = require("../../utils/utils");

var _downloadjs = _interopRequireDefault(require("downloadjs"));

var _Formio = _interopRequireDefault(require("../../Formio"));

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

// canvas.toBlob polyfill.
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function value(callback, type, quality) {
      var canvas = this;
      setTimeout(function () {
        var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], {
          type: type || 'image/png'
        }));
      });
    }
  });
}

var FileComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(FileComponent, _BaseComponent);

  _createClass(FileComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
        type: 'file',
        label: 'Upload',
        key: 'file',
        image: false,
        imageSize: '200',
        filePattern: '*',
        fileMinSize: '0KB',
        fileMaxSize: '1GB',
        uploadOnly: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'File',
        group: 'advanced',
        icon: 'fa fa-file',
        documentation: 'http://help.form.io/userguide/#file',
        weight: 100,
        schema: FileComponent.schema()
      };
    }
  }]);

  function FileComponent(component, options, data) {
    var _this;

    _classCallCheck(this, FileComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileComponent).call(this, component, options, data));
    _this.support = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: 'upload' in new XMLHttpRequest()
    };
    return _this;
  }

  _createClass(FileComponent, [{
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.dataValue = value || [];
      this.refreshDOM();
    }
  }, {
    key: "validateMultiple",
    // File is always an array.
    value: function validateMultiple() {
      return false;
    }
  }, {
    key: "build",
    value: function build() {
      // Restore the value.
      this.restoreValue();
      var labelAtTheBottom = this.component.labelPosition === 'bottom';
      this.createElement();

      if (!labelAtTheBottom) {
        this.createLabel(this.element);
      }

      this.inputsContainer = this.ce('div');
      this.errorContainer = this.inputsContainer;
      this.createErrorElement();
      this.listContainer = this.buildList();
      this.inputsContainer.appendChild(this.listContainer);
      this.uploadContainer = this.buildUpload();
      this.hiddenFileInputElement = this.buildHiddenFileInput();
      this.hook('input', this.hiddenFileInputElement, this.inputsContainer);
      this.inputsContainer.appendChild(this.hiddenFileInputElement);
      this.inputsContainer.appendChild(this.uploadContainer);
      this.addWarnings(this.inputsContainer);
      this.buildUploadStatusList(this.inputsContainer);
      this.setInputStyles(this.inputsContainer);
      this.element.appendChild(this.inputsContainer);

      if (labelAtTheBottom) {
        this.createLabel(this.element);
      }

      this.createDescription(this.element);
      this.autofocus(); // Disable if needed.

      if (this.shouldDisable) {
        this.disabled = true;
      }

      this.attachLogic();
    }
  }, {
    key: "refreshDOM",
    value: function refreshDOM() {
      // Don't refresh before the initial render.
      if (this.listContainer && this.uploadContainer) {
        // Refresh file list.
        var newList = this.buildList();
        this.inputsContainer.replaceChild(newList, this.listContainer);
        this.listContainer = newList; // Refresh upload container.

        var newUpload = this.buildUpload();
        this.inputsContainer.replaceChild(newUpload, this.uploadContainer);
        this.uploadContainer = newUpload;
      }
    }
  }, {
    key: "buildList",
    value: function buildList() {
      if (this.component.image) {
        return this.buildImageList();
      } else {
        return this.buildFileList();
      }
    }
  }, {
    key: "buildFileList",
    value: function buildFileList() {
      var _this2 = this;

      return this.ce('ul', {
        class: 'list-group list-group-striped'
      }, [this.ce('li', {
        class: 'list-group-item list-group-header hidden-xs hidden-sm'
      }, this.ce('div', {
        class: 'row'
      }, [this.ce('div', {
        class: 'col-md-1'
      }), this.ce('div', {
        class: 'col-md-9'
      }, this.ce('strong', {}, this.text('File Name'))), this.ce('div', {
        class: 'col-md-2'
      }, this.ce('strong', {}, this.text('Size')))])), this.dataValue.map(function (fileInfo, index) {
        return _this2.createFileListItem(fileInfo, index);
      })]);
    }
  }, {
    key: "buildHiddenFileInput",
    value: function buildHiddenFileInput() {
      var _this3 = this;

      // Input needs to be in DOM and "visible" (opacity 0 is fine) for IE to display file dialog.
      return this.ce('input', {
        type: 'file',
        style: 'opacity: 0; position: absolute;',
        tabindex: -1,
        // prevent focus
        onChange: function onChange() {
          _this3.upload(_this3.hiddenFileInputElement.files);

          _this3.hiddenFileInputElement.value = '';
        }
      });
    }
  }, {
    key: "createFileListItem",
    value: function createFileListItem(fileInfo, index) {
      var _this4 = this;

      var fileService = this.fileService;
      return this.ce('li', {
        class: 'list-group-item'
      }, this.ce('div', {
        class: 'row'
      }, [this.ce('div', {
        class: 'col-md-1'
      }, !this.disabled && !this.shouldDisable ? this.ce('i', {
        class: this.iconClass('remove'),
        onClick: function onClick(event) {
          if (fileInfo && _this4.component.storage === 'url') {
            fileService.makeRequest('', fileInfo.url, 'delete');
          }

          event.preventDefault();

          _this4.splice(index);

          _this4.refreshDOM();
        }
      }) : null), this.ce('div', {
        class: 'col-md-9'
      }, this.createFileLink(fileInfo)), this.ce('div', {
        class: 'col-md-2'
      }, this.fileSize(fileInfo.size))]));
    }
  }, {
    key: "createFileLink",
    value: function createFileLink(file) {
      if (this.options.uploadOnly) {
        return file.originalName || file.name;
      }

      return this.ce('a', {
        href: file.url,
        target: '_blank',
        onClick: this.getFile.bind(this, file)
      }, file.originalName || file.name);
    }
  }, {
    key: "buildImageList",
    value: function buildImageList() {
      var _this5 = this;

      return this.ce('div', {}, this.dataValue.map(function (fileInfo, index) {
        return _this5.createImageListItem(fileInfo, index);
      }));
    }
  }, {
    key: "createImageListItem",
    value: function createImageListItem(fileInfo, index) {
      var _this6 = this;

      var image;
      var fileService = this.fileService;

      if (fileService) {
        fileService.downloadFile(fileInfo).then(function (result) {
          image.src = result.url;
        });
      }

      return this.ce('div', {}, this.ce('span', {}, [image = this.ce('img', {
        src: '',
        alt: fileInfo.originalName || fileInfo.name,
        style: "width:".concat(this.component.imageSize, "px")
      }), !this.disabled ? this.ce('i', {
        class: this.iconClass('remove'),
        onClick: function onClick(event) {
          if (fileInfo && _this6.component.storage === 'url') {
            fileService.makeRequest('', fileInfo.url, 'delete');
          }

          event.preventDefault();

          _this6.splice(index);

          _this6.refreshDOM();
        }
      }) : null]));
    }
  }, {
    key: "startVideo",
    value: function startVideo() {
      var _this7 = this;

      navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      navigator.getMedia({
        video: {
          width: {
            min: 640,
            ideal: 1920
          },
          height: {
            min: 400,
            ideal: 1080
          },
          aspectRatio: {
            ideal: 1.7777777778
          }
        },
        audio: false
      }, function (stream) {
        if (navigator.mozGetUserMedia) {
          _this7.video.mozSrcObject = stream;
        } else {
          _this7.video.srcObject = stream;
        }

        var width = parseInt(_this7.component.webcamSize) || 320;

        _this7.video.setAttribute('width', width);

        _this7.video.play();
      }, function (err) {
        console.log(err);
      });
    }
  }, {
    key: "takePicture",
    value: function takePicture() {
      var _this8 = this;

      this.canvas.setAttribute('width', this.video.videoWidth);
      this.canvas.setAttribute('height', this.video.videoHeight);
      this.canvas.getContext('2d').drawImage(this.video, 0, 0);
      this.canvas.toBlob(function (blob) {
        blob.name = "photo-".concat(Date.now(), ".png");

        _this8.upload([blob]);
      });
    }
  }, {
    key: "buildUpload",
    value: function buildUpload() {
      var _this9 = this;

      // Drop event must change this pointer so need a reference to parent this.
      var element = this; // Declare Camera Instace

      var Camera; // Implement Camera file upload for WebView Apps.

      if (this.component.image && (navigator.camera || Camera)) {
        var camera = navigator.camera || Camera;
        return this.ce('div', {}, !this.disabled && (this.component.multiple || this.dataValue.length === 0) ? this.ce('div', {
          class: 'fileSelector'
        }, [this.ce('button', {
          class: 'btn btn-primary',
          onClick: function onClick(event) {
            event.preventDefault();
            camera.getPicture(function (success) {
              window.resolveLocalFileSystemURL(success, function (fileEntry) {
                fileEntry.file(function (file) {
                  _this9.upload([file]);
                });
              });
            }, null, {
              sourceType: camera.PictureSourceType.PHOTOLIBRARY
            });
          }
        }, [this.ce('i', {
          class: this.iconClass('book')
        }), this.text('Gallery')]), this.ce('button', {
          class: 'btn btn-primary',
          onClick: function onClick(event) {
            event.preventDefault();
            camera.getPicture(function (success) {
              window.resolveLocalFileSystemURL(success, function (fileEntry) {
                fileEntry.file(function (file) {
                  _this9.upload([file]);
                });
              });
            }, null, {
              sourceType: camera.PictureSourceType.CAMERA,
              encodingType: camera.EncodingType.PNG,
              mediaType: camera.MediaType.PICTURE,
              saveToPhotoAlbum: true,
              correctOrientation: false
            });
          }
        }, [this.ce('i', {
          class: this.iconClass('camera')
        }), this.text('Camera')])]) : this.ce('div'));
      } // If this is disabled or a single value with a value, don't show the upload div.


      var render = this.ce('div', {}, !this.disabled && (this.component.multiple || this.dataValue.length === 0) ? !this.cameraMode ? [this.ce('div', {
        class: 'fileSelector',
        onDragover: function onDragover(event) {
          this.className = 'fileSelector fileDragOver';
          event.preventDefault();
        },
        onDragleave: function onDragleave(event) {
          this.className = 'fileSelector';
          event.preventDefault();
        },
        onDrop: function onDrop(event) {
          this.className = 'fileSelector';
          event.preventDefault();
          element.upload(event.dataTransfer.files);
          return false;
        }
      }, [this.ce('i', {
        class: this.iconClass('cloud-upload')
      }), this.text(' Drop files to attach, or '), this.buildBrowseLink(), this.component.webcam ? [this.text(', or '), this.ce('a', {
        href: '#',
        title: 'Use Web Camera',
        onClick: function onClick(event) {
          event.preventDefault();
          _this9.cameraMode = !_this9.cameraMode;

          _this9.refreshDOM();
        }
      }, this.ce('i', {
        class: this.iconClass('camera')
      }))] : null])] : [this.ce('div', {}, [this.video = this.ce('video', {
        class: 'video',
        autoplay: true
      }), this.canvas = this.ce('canvas', {
        style: 'display: none;'
      }), this.photo = this.ce('img')]), this.ce('div', {
        class: 'btn btn-primary',
        onClick: function onClick() {
          _this9.takePicture();
        }
      }, 'Take Photo'), this.ce('div', {
        class: 'btn btn-default',
        onClick: function onClick() {
          _this9.cameraMode = !_this9.cameraMode;

          _this9.refreshDOM();
        }
      }, 'Switch to file upload')] : this.ce('div'));

      if (this.cameraMode) {
        this.startVideo();
      }

      return render;
    }
  }, {
    key: "buildBrowseLink",
    value: function buildBrowseLink() {
      var _this10 = this;

      this.browseLink = this.ce('a', {
        href: '#',
        onClick: function onClick(event) {
          event.preventDefault(); // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
          // a click event on it.

          if (typeof _this10.hiddenFileInputElement.trigger === 'function') {
            _this10.hiddenFileInputElement.trigger('click');
          } else {
            _this10.hiddenFileInputElement.click();
          }
        },
        class: 'browse'
      }, this.text('browse'));
      this.addFocusBlurEvents(this.browseLink);
      return this.browseLink;
    }
  }, {
    key: "buildUploadStatusList",
    value: function buildUploadStatusList(container) {
      var list = this.ce('div');
      this.uploadStatusList = list;
      container.appendChild(list);
    }
  }, {
    key: "addWarnings",
    value: function addWarnings(container) {
      var hasWarnings = false;
      var warnings = this.ce('div', {
        class: 'alert alert-warning'
      });

      if (!this.component.storage) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('No storage has been set for this field. File uploads are disabled until storage is set up.')));
      }

      if (!this.support.dnd) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('File Drag/Drop is not supported for this browser.')));
      }

      if (!this.support.filereader) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('File API & FileReader API not supported.')));
      }

      if (!this.support.formdata) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('XHR2\'s FormData is not supported.')));
      }

      if (!this.support.progress) {
        hasWarnings = true;
        warnings.appendChild(this.ce('p').appendChild(this.text('XHR2\'s upload progress isn\'t supported.')));
      }

      if (hasWarnings) {
        container.appendChild(warnings);
      }
    }
    /* eslint-disable max-len */

  }, {
    key: "fileSize",
    value: function fileSize(a, b, c, d, e) {
      return "".concat((b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2), " ").concat(e ? "".concat('kMGTPEZY'[--e], "B") : 'Bytes');
    }
    /* eslint-enable max-len */

  }, {
    key: "createUploadStatus",
    value: function createUploadStatus(fileUpload) {
      var _this11 = this;

      var container;
      return container = this.ce('div', {
        class: "file".concat(fileUpload.status === 'error' ? ' has-error' : '')
      }, [this.ce('div', {
        class: 'row'
      }, [this.ce('div', {
        class: 'fileName control-label col-sm-10'
      }, [fileUpload.originalName, this.ce('i', {
        class: this.iconClass('remove'),
        onClick: function onClick() {
          return _this11.removeChildFrom(container, _this11.uploadStatusList);
        }
      })]), this.ce('div', {
        class: 'fileSize control-label col-sm-2 text-right'
      }, this.fileSize(fileUpload.size))]), this.ce('div', {
        class: 'row'
      }, [this.ce('div', {
        class: 'col-sm-12'
      }, [fileUpload.status === 'progress' ? this.ce('div', {
        class: 'progress'
      }, this.ce('div', {
        class: 'progress-bar',
        role: 'progressbar',
        'aria-valuenow': fileUpload.progress,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        style: "width:".concat(fileUpload.progress, "%")
      }, this.ce('span', {
        class: 'sr-only'
      }, "".concat(fileUpload.progress, "% Complete")))) : this.ce('div', {
        class: "bg-".concat(fileUpload.status)
      }, fileUpload.message)])])]);
    }
    /* eslint-disable max-depth */

  }, {
    key: "globStringToRegex",
    value: function globStringToRegex(str) {
      var regexp = '',
          excludes = [];

      if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
        regexp = str.substring(1, str.length - 1);
      } else {
        var split = str.split(',');

        if (split.length > 1) {
          for (var i = 0; i < split.length; i++) {
            var r = this.globStringToRegex(split[i]);

            if (r.regexp) {
              regexp += "(".concat(r.regexp, ")");

              if (i < split.length - 1) {
                regexp += '|';
              }
            } else {
              excludes = excludes.concat(r.excludes);
            }
          }
        } else {
          if (str.indexOf('!') === 0) {
            excludes.push("^((?!".concat(this.globStringToRegex(str.substring(1)).regexp, ").)*$"));
          } else {
            if (str.indexOf('.') === 0) {
              str = "*".concat(str);
            }

            regexp = "^".concat(str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&'), "$");
            regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
          }
        }
      }

      return {
        regexp: regexp,
        excludes: excludes
      };
    }
    /* eslint-enable max-depth */

  }, {
    key: "translateScalars",
    value: function translateScalars(str) {
      if (typeof str === 'string') {
        if (str.search(/kb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1024);
        } else if (str.search(/mb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1048576);
        } else if (str.search(/gb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1073741824);
        } else if (str.search(/b/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1));
        } else if (str.search(/s/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1));
        } else if (str.search(/m/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1) * 60);
        } else if (str.search(/h/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1) * 3600);
        }
      }

      return str;
    }
  }, {
    key: "validatePattern",
    value: function validatePattern(file, val) {
      if (!val) {
        return true;
      }

      var pattern = this.globStringToRegex(val);
      var valid = true;

      if (pattern.regexp && pattern.regexp.length) {
        var regexp = new RegExp(pattern.regexp, 'i');
        valid = file.type != null && regexp.test(file.type) || file.name != null && regexp.test(file.name);
      }

      var len = pattern.excludes.length;

      while (len--) {
        var exclude = new RegExp(pattern.excludes[len], 'i');
        valid = valid && (file.type == null || exclude.test(file.type)) && (file.name == null || exclude.test(file.name));
      }

      return valid;
    }
  }, {
    key: "validateMinSize",
    value: function validateMinSize(file, val) {
      return file.size + 0.1 >= this.translateScalars(val);
    }
  }, {
    key: "validateMaxSize",
    value: function validateMaxSize(file, val) {
      return file.size - 0.1 <= this.translateScalars(val);
    }
  }, {
    key: "upload",
    value: function upload(files) {
      var _this12 = this;

      // Only allow one upload if not multiple.
      if (!this.component.multiple) {
        files = Array.prototype.slice.call(files, 0, 1);
      }

      if (this.component.storage && files && files.length) {
        // files is not really an array and does not have a forEach method, so fake it.
        Array.prototype.forEach.call(files, function (file) {
          var fileName = (0, _utils.uniqueName)(file.name);
          var fileUpload = {
            originalName: file.name,
            name: fileName,
            size: file.size,
            status: 'info',
            message: 'Starting upload'
          }; // Check file pattern

          if (_this12.component.filePattern && !_this12.validatePattern(file, _this12.component.filePattern)) {
            fileUpload.status = 'error';
            fileUpload.message = "File is the wrong type; it must be ".concat(_this12.component.filePattern);
          } // Check file minimum size


          if (_this12.component.fileMinSize && !_this12.validateMinSize(file, _this12.component.fileMinSize)) {
            fileUpload.status = 'error';
            fileUpload.message = "File is too small; it must be at least ".concat(_this12.component.fileMinSize);
          } // Check file maximum size


          if (_this12.component.fileMaxSize && !_this12.validateMaxSize(file, _this12.component.fileMaxSize)) {
            fileUpload.status = 'error';
            fileUpload.message = "File is too big; it must be at most ".concat(_this12.component.fileMaxSize);
          } // Get a unique name for this file to keep file collisions from occurring.


          var dir = _this12.interpolate(_this12.component.dir || '');

          var fileService = _this12.fileService;

          if (!fileService) {
            fileUpload.status = 'error';
            fileUpload.message = 'File Service not provided.';
          }

          var uploadStatus = _this12.createUploadStatus(fileUpload);

          _this12.uploadStatusList.appendChild(uploadStatus);

          if (fileUpload.status !== 'error') {
            fileService.uploadFile(_this12.component.storage, file, fileName, dir, function (evt) {
              fileUpload.status = 'progress';
              fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
              delete fileUpload.message;
              var originalStatus = uploadStatus;
              uploadStatus = _this12.createUploadStatus(fileUpload);

              _this12.uploadStatusList.replaceChild(uploadStatus, originalStatus);
            }, _this12.component.url).then(function (fileInfo) {
              _this12.removeChildFrom(uploadStatus, _this12.uploadStatusList);

              fileInfo.originalName = file.name;

              _this12.dataValue.push(fileInfo);

              _this12.refreshDOM();

              _this12.triggerChange();
            }).catch(function (response) {
              fileUpload.status = 'error';
              fileUpload.message = response;
              delete fileUpload.progress;
              var originalStatus = uploadStatus;
              uploadStatus = _this12.createUploadStatus(fileUpload);

              _this12.uploadStatusList.replaceChild(uploadStatus, originalStatus);
            });
          }
        });
      }
    }
  }, {
    key: "getFile",
    value: function getFile(fileInfo, event) {
      var fileService = this.fileService;

      if (!fileService) {
        return alert('File Service not provided');
      }

      fileService.downloadFile(fileInfo).then(function (file) {
        if (file) {
          if (file.storage === 'base64') {
            (0, _downloadjs.default)(file.url, file.originalName, file.type);
          } else {
            window.open(file.url, '_blank');
          }
        }
      }).catch(function (response) {
        // Is alert the best way to do this?
        // User is expecting an immediate notification due to attempting to download a file.
        alert(response);
      });
      event.preventDefault();
    }
  }, {
    key: "focus",
    value: function focus() {
      this.browseLink.focus();
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return FileComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [];
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(FileComponent.prototype), "defaultValue", this);

      return Array.isArray(value) ? value : [];
    }
  }, {
    key: "fileService",
    get: function get() {
      if (this.options.fileService) {
        return this.options.fileService;
      }

      if (this.options.formio) {
        return this.options.formio;
      }

      if (this.root && this.root.formio) {
        return this.root.formio;
      }

      return new _Formio.default();
    }
  }]);

  return FileComponent;
}(_Base.default);

exports.default = FileComponent;