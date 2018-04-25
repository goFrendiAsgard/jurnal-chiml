const path = require('path')
const process = require('process')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(path.join(__dirname, 'test.db'))

module.exports = {
  runSql,
  select,
  selectPersons,
  selectPokemons
}

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
  runSql(sql, params, callback)
}

function selectPersons (filter, callback) {
  select('persons', filter, callback)
}

function selectPokemons (filter, callback) {
  select('persons', filter, callback)
}

if (require.main === module) {
  try {
    const tableName = process.argv[2]
    const filter = JSON.parse(process.argv[3])
    if (tableName === 'pokemons' || tableName === 'persons') {
      select(tableName, filter, (error, rows) => {
        if (error) {
          console.error(error)
        } else {
          console.log(JSON.stringify(rows))
        }
      })
    } else {
      console.error('Only selecting from `pokemons` or `persons` are allowed')
    }
  } catch (error) {
    console.error(error)
  }
}
