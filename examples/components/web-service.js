'use strict'
require('cache-require-paths')

const path = require('path')
const {select} = require(path.join(__dirname, 'lib.js'))
const express = require('express')
const app = express()
const port = 3010

function addRoute (app, tableName) {
  const route = '/' + tableName
  app.get(route, (req, res) => {
    const filter = req.query
    select(tableName, filter, (error, rows) => {
      if (error) {
        console.error(error)
        return res.send(JSON.stringify({error}))
      }
      console.log(rows)
      return res.send(JSON.stringify(rows))
    })
  })
}

addRoute(app, 'albums')
addRoute(app, 'genres')
addRoute(app, 'tracks')

if (require.main === module) {
  app.listen(port, () => {
    console.log('Web Service started at port ' + port)
  })
}
