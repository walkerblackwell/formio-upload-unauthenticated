"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = function url(formio) {
  return {
    title: 'Url',
    name: 'url',
    uploadFile: function uploadFile(file, fileName, dir, progressCallback, url) {
      return new _nativePromiseOnly.default(function (resolve, reject) {
        var data = {
          dir: dir,
          file: file,
          name: fileName
        }; // Send the file with data.

        var xhr = new XMLHttpRequest();

        if (typeof progressCallback === 'function') {
          xhr.upload.onprogress = progressCallback;
        }

        var fd = new FormData();

        for (var key in data) {
          fd.append(key, data[key]);
        }

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Need to test if xhr.response is decoded or not.
            var respData = {};

            try {
              respData = typeof xhr.response === 'string' ? JSON.parse(xhr.response) : {};
              respData = respData && respData.data ? respData.data : respData;
            } catch (err) {
              respData = {};
            }

            var _url = respData.hasOwnProperty('url') ? respData.url : "".concat(xhr.responseURL, "/").concat(fileName);

            resolve({
              storage: 'url',
              name: fileName,
              url: _url,
              size: file.size,
              type: file.type,
              data: respData
            });
          } else {
            reject(xhr.response || 'Unable to upload file');
          }
        }; // Fire on network error.


        xhr.onerror = function () {
          return reject(xhr);
        };

        xhr.onabort = function () {
          return reject(xhr);
        };

        xhr.open('POST', url);
        var token = formio.getToken();

        if (token) {
          xhr.setRequestHeader('x-jwt-token', token);
        }

        xhr.send(fd);
      });
    },
    downloadFile: function downloadFile(file) {
      // Return the original as there is nothing to do.
      return _nativePromiseOnly.default.resolve(file);
    }
  };
};

url.title = 'Url';
var _default = url;
exports.default = _default;