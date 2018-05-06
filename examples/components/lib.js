'use strict'
require('cache-require-paths')

const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(path.join(__dirname, 'chinook.db'))

module.exports = {select}

function runSql (sql, params, callback) {
  db.all(sql, params, callback)
}

function select (tableName, filter, callback) {
  let sql = 'SELECT * FROM ' + tableName + ' WHERE 1=1'
  let params = []
  for (let key in filter) {
    let val = filter[key]
    sql += ' AND ' + key + '= ?'
    params.push(val)
  }
  sql += ' LIMIT 15'
  runSql(sql, params, callback)
}
