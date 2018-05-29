const rpn = require('request-promise-native')
async function fetchBooks (genres) {
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i]
    const body = await rpn('http://localhost:3000/books?genreId=' + genre.id)
    const books = JSON.parse(body).map((book) => book.title)
    genres[i] = {name: genre.name, books}
  }
  console.log(JSON.stringify(genres))
}
async function fetchGenres () {
  const body = await rpn('http://localhost:3000/genres')
  const genres = JSON.parse(body)
  fetchBooks(genres)
}
fetchGenres()
