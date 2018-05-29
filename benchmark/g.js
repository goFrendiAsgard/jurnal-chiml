const rpn = require('request-promise-native')
async function fetchGenres () {
  const body = await rpn('http://localhost:3000/genres')
  const genres = JSON.parse(body).map((genre) => genre.name)
  console.log(JSON.stringify(genres))
}
fetchGenres()
