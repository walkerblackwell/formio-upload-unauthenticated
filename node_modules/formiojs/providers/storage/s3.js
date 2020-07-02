"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trim = function trim(text) {
  return (0, _trim2.default)(text, '/');
};

var path = function path(items) {
  return items.filter(function (item) {
    return !!item;
  }).map(trim).join('/');
};

var s3 = function s3(formio) {
  return {
    uploadFile: function uploadFile(file, fileName, dir, progressCallback) {
      return new _nativePromiseOnly.default(function (resolve, reject) {
        // Send the pre response to sign the upload.
        var pre = new XMLHttpRequest(); // This only fires on a network error.

        pre.onerror = function (err) {
          err.networkError = true;
          reject(err);
        };

        pre.onabort = reject;

        pre.onload = function () {
          if (pre.status >= 200 && pre.status < 300) {
            var response = JSON.parse(pre.response); // Send the file with data.

            var xhr = new XMLHttpRequest();

            if (typeof progressCallback === 'function') {
              xhr.upload.onprogress = progressCallback;
            }

            response.data.fileName = fileName;
            response.data.key = path([response.data.key, dir, fileName]); // Fire on network error.

            xhr.onerror = function (err) {
              err.networkError = true;
              reject(err);
            };

            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve({
                  storage: 's3',
                  name: fileName,
                  bucket: response.bucket,
                  key: response.data.key,
                  url: path([response.url, response.data.key]),
                  acl: response.data.acl,
                  size: file.size,
                  type: file.type
                });
              } else {
                reject(xhr.response || 'Unable to upload file');
              }
            };

            xhr.onabort = reject;

            if (response.signed) {
              xhr.open('PUT', response.signed);
              xhr.setRequestHeader('Content-Type', file.type);
              xhr.send(file);
            } else {
              var fd = new FormData();

              for (var key in response.data) {
                fd.append(key, response.data[key]);
              }

              fd.append('file', file);
              xhr.open('POST', response.url);
              xhr.send(fd);
            }
          } else {
            reject(pre.response || 'Unable to sign file');
          }
        };

        pre.open('POST', "".concat(formio.formUrl, "/storage/s3"));
        pre.setRequestHeader('Accept', 'application/json');
        pre.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var token = formio.getToken();

        if (token) {
          pre.setRequestHeader('x-jwt-token', token);
        }

        pre.send(JSON.stringify({
          name: path([dir, fileName]),
          size: file.size,
          type: file.type
        }));
      });
    },
    downloadFile: function downloadFile(file) {
      if (file.acl !== 'public-read') {
        return formio.makeRequest('file', "".concat(formio.formUrl, "/storage/s3?bucket=").concat(trim(file.bucket), "&key=").concat(trim(file.key)), 'GET');
      } else {
        return _nativePromiseOnly.default.resolve(file);
      }
    }
  };
};

s3.title = 'S3';
var _default = s3;
exports.default = _default;