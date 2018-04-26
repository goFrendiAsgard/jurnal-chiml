const request = require('request')
const async = require('async')
const urlGenre = 'http://localhost:3010/genres'
const urlAlbum = 'http://localhost:3010/albums'
const urlTrack = 'http://localhost:3010/tracks'

let albumDictionary = {}
let finalResult = []
request(urlGenre, (error, response, body) => {
  if (error) {
    return console.error(error)
  }
  let genres = JSON.parse(body)
  let fetchTracks = []
  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i]
    finalResult.push({GenreName: genre.Name, tracks: []})
    genre.tracks = []
    fetchTracks.push((nextFetchTrack) => {
      request(urlTrack + '?GenreId=' + genre.GenreId, (error, response, body) => {
        if (error) {
          return nextFetchTrack(error)
        }
        let tracks = JSON.parse(body)
        let fetchAlbum = []
        for (let j = 0; j < tracks.length; j++) {
          let track = tracks[j]
          finalResult[i]['tracks'].push({TrackName: track.Name})
          fetchAlbum.push((nextFetchAlbum) => {
            if (track.AlbumId in albumDictionary) {
              finalResult[i]['tracks'][j]['AlbumTitle'] = albumDictionary[track.AlbumId]
              return nextFetchAlbum()
            }
            return request(urlAlbum + '?AlbumId=' + track.AlbumId, (error, response, body) => {
              if (error) {
                return nextFetchAlbum(error)
              }
              let albums = JSON.parse(body)
              let album = albums[0]
              albumDictionary[track.albumId] = album.Title
              finalResult[i]['tracks'][j]['AlbumTitle'] = album.Title
              nextFetchAlbum()
            })
          })
        }
        return async.parallel(fetchAlbum, (error, result) => {
          nextFetchTrack(error, result)
        })
      })
    })
  }
  return async.parallel(fetchTracks, (error, result) => {
    if (error) {
      return console.error(error)
    }
    return console.log(JSON.stringify(finalResult))
  })
})
