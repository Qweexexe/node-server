const fs = require('fs')
const path = require('path')
const http = require('http')
const {mimeTypes} = require('./mime')
const PORT = 3500


function staticFile(res, filePath ,ext) {
    res.setHeader('Content-type', mimeTypes[ext])
    console.log('==============public' + filePath )
    fs.readFile('./public' + filePath, {encoding : 'utf-8'}, (err, data) => {
        if (err){
            console.log('!!!!')
            res.statusCode = 404
            res.end()
        }
        res.end(data)
        console.log('success')
    })
}

http.createServer((req, res) => {
    let url = req.url
    switch (url) {
        case '/':
            staticFile(res, '/html/index.html', '.html')
            break
        case '/contacts':
            staticFile(res, '/html/contacts.html', '.html')
            break
        default :
            const extname = String(path.extname(url)).toLowerCase()
            if (extname in mimeTypes) {
                console.log(url)
                staticFile(res, url, extname)
            }
            res.statusCode = 404
            res.end()
    }
}).listen(PORT)