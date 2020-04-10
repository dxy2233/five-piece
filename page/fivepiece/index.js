'use strict'
const fs = require('fs')
const path = require('path')

exports.main_handler = async () => {
  let html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), {
    encoding: 'utf-8'
  })
  return {
    isBase64Encoded: false,
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html
  }
}
