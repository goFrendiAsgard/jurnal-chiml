const async = require('async')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('components/test.db')

const sql = {
  createPersons: 'CREATE TABLE persons(id INTEGER, name TEXT)',
  createPokemons: 'CREATE TABLE pokemons(id INTEGER, id_person INTEGER, name TEXT)',
  insertPerson: 'INSERT INTO persons(id, name) VALUES(?, ?)',
  insertPokemon: 'INSERT INTO pokemons(id, id_person, name) VALUES(?, ?, ?)'
}

async.series([
  // create table persons
  (next) => {
    db.run(sql.createPersons, [], next)
  },
  // create table pokemons
  (next) => {
    db.run(sql.createPokemons, [], next)
  },
  // insert persons
  (next) => {
    db.run(sql.insertPerson, [1, 'Ash'], next)
  },
  (next) => {
    db.run(sql.insertPerson, [2, 'Misty'], next)
  },
  // insert pokemons
  (next) => {
    db.run(sql.insertPokemon, [1, 1, 'Pikachu'], next)
  },
  (next) => {
    db.run(sql.insertPokemon, [2, 1, 'Rowlet'], next)
  },
  (next) => {
    db.run(sql.insertPokemon, [3, 1, 'Rockruff'], next)
  },
  (next) => {
    db.run(sql.insertPokemon, [4, 2, 'Staryu'], next)
  },
  (next) => {
    db.run(sql.insertPokemon, [5, 2, 'Psyduck'], next)
  },
  (next) => {
    db.run(sql.insertPokemon, [6, 2, 'Magikarp'], next)
  }
], (error, result) => {
  if (error) {
    console.error(error)
  }
  console.log('finished')
})
