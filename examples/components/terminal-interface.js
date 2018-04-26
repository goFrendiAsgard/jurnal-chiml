'use strict'
require('cache-require-paths')

const path = require('path')
const process = require('process')
const {select} = require(path.join(__dirname, 'lib.js'))

if (require.main === module) {
  try {
    const tableName = process.argv[2]
    const filter = JSON.parse(process.argv[3])
    select(tableName, filter, (error, rows) => {
      if (error) {
        console.error(JSON.stringify({error}))
      } else {
        console.log(JSON.stringify(rows))
      }
    })
  } catch (error) {
    console.error(error)
  }
}
