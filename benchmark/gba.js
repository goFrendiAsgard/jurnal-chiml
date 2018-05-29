const rpn = require('request-promise-native')
async function fetchBookAuthor (genres) {
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i]
    const books = genre.books
    for (let j = 0; j < books.length; j++) {
      const book = books[j]
      const body = await rpn('http://localhost:3000/authors?id=' + book.authorId)
      const author = JSON.parse(body)[0]
      books[j] = {title: book.title, author: author.name}
    }
    genres[i].books = books
  }
  console.log(JSON.stringify(genres))
}
async function fetchBooks (genres) {
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i]
    const body = await rpn('http://localhost:3000/books?genreId=' + genre.id)
    const books = JSON.parse(body)
    genres[i] = {name: genre.name, books}
  }
  fetchBookAuthor(genres)
}
async function fetchGenres () {
  const body = await rpn('http://localhost:3000/genres')
  const genres = JSON.parse(body)
  fetchBooks(genres)
}
fetchGenres()
