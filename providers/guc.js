const fs = require('fs');
const Provider = require('./provider');
const crypto = require('crypto')
const axios = require('axios');
const FormData = require('form-data');

function signMessage(dateStr, params) {
  let str = ""
  keys = Object.keys(params)
  keys.sort()
  for (const key of keys) {
    str += key + ":" + params[key]
  }
  str += dateStr

  return crypto.createHmac('sha1', process.env.GUC_TOKEN)
    .update(str)
    .digest('hex')
}

function getContent(dateStr, messageParams) {
  return `{"hmac":"${signMessage(dateStr, messageParams)}","date":"${dateStr}","message":${JSON.stringify(messageParams)}}`
}

class GucProvider extends Provider {
  
  static upload(file, dir) {
    let headers = {
      "X-Blithe-Context" : "{}",
      "Content-Type" : "text/x-json; charset=utf-8",
      "X-Blithe-Version" : "2.0",
      "Accept" : "text/x-json"
    }
    
    const now = new Date()
    let content = getContent(now.toISOString(),{application: process.env.GUC_APPLICATION})
    let promise = new Promise(function(resolve, reject) {
      axios.post(process.env.GUC_URL + '/api/request_upload', content, { headers: headers}).then((response) => {
        //make actual upload request
        let formData = new FormData();
        formData.append('filename', fs.createReadStream(file.path), {'filename': file.originalname, 'contentType': file.mimetype})
        axios.post(response.data.return.upload_uri, formData, {headers: formData.getHeaders()} ).then((r) => {
          resolve({url: `/${response.data.return.file_uuid}`})
        }).catch((error) => {
          reject(error)
        })
      }).catch((error) => {
        reject(error)
      })
    })
    return promise
  }

  static download(fileId, req, res) {
    let headers = {
      "X-Blithe-Context" : "{}",
      "Content-Type" : "text/x-json; charset=utf-8",
      "X-Blithe-Version" : "2.0",
      "Accept" : "text/x-json"
    }
    
    const now = new Date()
    let content = getContent(now.toISOString(), {application: process.env.GUC_APPLICATION, file_uuid: fileId})
    axios.post(process.env.GUC_URL + '/api/request_download', content, { headers: headers}).then((response) => {
      if (response.data.return === null) {
        for (let error of response.data.message_stack) {
          res.send(error.text)
        }
      }
      else { 
        axios.get(response.data.return.download_uri, {responseType:'arraybuffer'}).then((r) => {
          res.set('Content-Type', r.headers['content-type']);
          res.set('Content-Disposition', r.headers['content-disposition']);
          res.send(r.data) 
        }).catch((error) => {
          res.status(500).send(error)
        })
      }
    }).catch((error) => {
      res.status(500).send(error)
    })
  }
}

module.exports = GucProvider;