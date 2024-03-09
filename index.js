const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

const createPath = (folder, page, ext) =>
   path.resolve(__dirname, folder, `${page}.${ext}`)

app.use(express.static(__dirname + '/pages'))
app.use(express.json())
app.use((req, res, next) => {
   console.log(req.url, req.method, req.body)
   next()
})
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// роуты страничек
app.get('/', (req, res) => {
   res.sendFile(createPath('pages', 'page1', 'html'))
})
app.get('/page1', (req, res) => {
   res.sendFile(createPath('pages', 'page1', 'html'))
})
app.get('/page2', (req, res) => {
   res.sendFile(createPath('pages', 'page2', 'html'))
})
// роуты работы с данными
app.post('/addData', (req, res) => {
   console.log(req.body)
   res.send({ message: 'ok' })
})
app.get('/getData', (req, res) => {
   let data = fs.readFileSync(createPath('data', 'data', 'json'))
   data = JSON.parse(data)
   console.log(data)
   res.send(data)
})

// server listening
app.listen(PORT, error => {
   error ? console.log(error) : console.log(`listening port ${PORT}`)
})