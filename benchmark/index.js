'use strict'

const express = require('express')
const chimeraCore = require('chimera-framework/lib/core.js')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const genres = [
  {id: 1, name: 'fiction'},
  {id: 2, name: 'history'},
  {id: 3, name: 'science'}
]

const authors = [
  {id: 1, name: 'Michael Kogge'},
  {id: 2, name: 'John Jackson Miller'},
  {id: 3, name: 'David McCullough'},
  {id: 4, name: 'Stephen Hawking'}
]

const books = [
  {id: 1, title: 'Rise of the Rebels', genreId: 1, authorId: 1},
  {id: 2, title: 'A New Dawn', genreId: 1, authorId: 2},
  {id: 3, title: 'John Adams', genreId: 2, authorId: 3},
  {id: 4, title: '1776', genreId: 2, authorId: 3},
  {id: 5, title: 'Brief History of Time', genreId: 3, authorId: 4},
  {id: 5, title: 'Grand Design', genreId: 3, authorId: 4}
]

const tables = {genres, authors, books}

function giveResponse (tableName, query, res) {
  const data = tables[tableName]
  const response = data.filter((row) => {
    let included = true
    for (let key in query) {
      const val = query[key]
      if (String(row[key]) !== val) {
        included = false
        break
      }
    }
    return included
  })
  res.send(JSON.stringify(response, null, 2))
}

function getFormHtml (insText, chiml) {
  return `<form method="post">
    <label>Inputs (separate with new line)</label>
    <textarea name="ins" style="width:100%; height:10%;">${insText}</textarea>
    <label>CHIML Script</label>
    <textarea name="chiml" style="width:100%; height:40%;">${chiml}</textarea>
    <br />
    <button>Send</button>
  </form>`
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  const insText = 'http://chiml-survey.herokuapp.com/genres'
  const chiml = 'ins: url\n' +
    'out: result\n' +
    'do:\n' +
    '  - |(url) -> [$.httpRequestBody] -> result'
  const html = getFormHtml(insText, chiml)
  res.send(html)
})

app.post('/', (req, res) => {
  const insText = req.body.ins
  const ins = insText.split('\n')
  const chiml = req.body.chiml
  const html = getFormHtml(insText, chiml)
  chimeraCore.executeChain(chiml, ins, (error, result) => {
    if (error) {
      res.send(html + '<pre>' + error.message + '</pre>')
    } else {
      if (typeof result !== 'string' && !(result instanceof String)) {
        result = JSON.stringify(result, null, 2)
      }
      res.send(html + '<pre>' + result + '</pre>')
    }
  })
})

app.get('/:tableName', (req, res) => {
  const tableName = req.params.tableName
  const query = req.query
  giveResponse(tableName, query, res)
})

if (require.main === module) {
  app.listen(port, () => {
    console.log('Web Service started at port ' + port)
  })
}
