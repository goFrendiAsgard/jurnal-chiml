# Problem

We want to give a brief example about how `CHIML`, `HTTP-API`, and `BPMN` can be use in order to orchestrate the pre-existing components to achieve a greater goal.

We will keep the explanation as short as possible as we want the readers to state their opinions by directly looking at the implementation.

We use the database from [Chinook sample database](http://www.sqlitetutorial.net/sqlite-sample-database/). The structure of the database is as follow:

![Database Diagram](components/sqlite-sample-database-diagram.png)

In this scenario our goal is to group `tracks` based on the `genres`. The expected data is as follow

```json
[
  {
    "GenreName": "Rock",
    "Tracks": [
      {
        "TrackName": "For Those About To Rock (We Salute You)",
        "AlbumTitle": "For Those About To Rock We Salute You"
      },
      {
        "TrackName": "Fast As a Shark",
        "AlbumTitle": "Restless and Wild"
      }
    ]
  },
  {
    "GenreName": "Latin",
    "Tracks": [
      {
        "TrackName": "Carolina",
        "AlbumTitle": "Minha Historia"
      },
      {
        "TrackName": "Essa Moça Ta Diferente",
        "AlbumTitle": "Minha Historia"
      }
    ]
  }
]
```

The developers can fetch the data through the pre-existing components.

The developers are pressumed to not has any access to the component's source-code or database server.

The only possible interaction is by accessing the `terminal interface` from component's local computer or by accessing `web service` from the network.

# The Pre-existing Components

The component has two interfaces. The `terminal` one and the `web-service` one

The `terminal-interface` can only be executed from the component's local computer.
Assuming that the developer building the application in the same computer as the components

The `web-service` can be executed through the network (internet) through HTTP protocol

## Terminal Interface

The terminal interface is located at [`components/program.js`](components/terminal-interface.js).

To access the terminal interface, developer can invoke `node components/terminal-interface.js <tableName> <filter>` from component's local computer

__Example:__

```bash
gofrendi@asgard:~$ node components/terminal-interface.js genres "{\"Name\":\"Rock\"}"
[{"GenreId":1,"Name":"Rock"}]
```

## Web Service

The web service is located at [`components/web-service.js`](components/web-service.js).

The web service, can be started by using the following command `node components/web-service.js` 

After the service started, the developer can send a GET request using this format `/<tableName>?<fieldName>=<value>` from the network.

__Example:__

```
URL: http://localhost:3010/genres?Name=Rock
RESULT: [{"GenreId":1,"Name":"Rock"}]
```

# Solution I: CHIML

CHIML is a YAML based language designed to orchestrate process flow in [Chimera-Framework]()

The detail explanation about CHIML language specification can be found [here](https://github.com/goFrendiAsgard/chimera-framework/wiki/CHIML)

There are 2 ways to develop the solutions. In the first implementation, we try to access terminal-interface, while in the second implementation we try to access web service

## Implementation Using Terminal Interface

```
# filename: chimera.terminal.chiml
# usage: chimera chimera.terminal.chiml
out: genres
do:

  - |('genres', {}) -> node components/terminal-interface.js -> genres

  - map: genres
    into: genres
    ins: genre
    out: genre
    do:

      - parallel:
        - |('tracks', {GenreId: genre.GenreId}) -> node components/terminal-interface.js -> tracks
        - |({GenreName: genre.Name, Tracks: []}) --> genre

      - map: tracks
        into: tracks
        ins: track
        out: track
        do:

          - |('albums', {AlbumId: track.AlbumId}) -> node components/terminal-interface.js -> albums
          - |(albums[0].Title) --> albumTitle

          - |({TrackName: track.Name, AlbumTitle: albumTitle}) --> track

      - |(tracks) -->  genre.Tracks

```

To use terminal interface, you can write the above CHIML script and invoke `chimera chimera.terminal.chiml`

### Performance

```
User:
System:
Real:
```

## Implementation Using Web-service Interface

```
# filename: chimera.web.chiml
# usage: chimera chimera.web.chiml
out: genres
do:

  - parallel:
    - |('http://localhost:3010/genres') --> urlGenre
    - |('http://localhost:3010/albums') --> urlAlbum
    - |('http://localhost:3010/tracks') --> urlTrack

  - |(urlGenre) -> [$.httpRequest] -> response
  - |(response.body) --> genres

  - map: genres
    into: genres
    ins: genre
    out: genre
    do:

      - parallel:
        - do:
          - |(urlTrack + '?GenreId=' + genre.GenreId) -> [$.httpRequest] -> response
          - |(response.body) --> tracks
        - |({GenreName: genre.Name, Tracks: []}) --> genre

      - map: tracks
        into: tracks
        ins: track
        out: track
        do:

          - |(urlAlbum + '?AlbumId=' + track.AlbumId) -> [$.httpRequest] -> response
          - |(response.body) --> albums
          - |(albums[0].Title) --> albumTitle

          - |({TrackName: track.Name, AlbumTitle: albumTitle}) --> track

      - |(tracks) -->  genre.Tracks

```

To run the solution, you can write the above CHIML script and invoke `chimera chimera.web.chiml`

### Performance
```
User:
System:
Real:
```

## Solution II: HTTP API

HTTP API is currently gain it popularity. Almost everything on the internet has HTTP-API interface, either by using `SOAP`, `REST`, or non-standardized protocol.

As already implied, HTTP API is only communicating through web-service. We are currently build the solution in Node.Js. Since Node.Js has asynchronous 

## Implementation Using Terminal Interface

```
Not present
```

## Implementation Using Web-service Interface

```js
const request = require('request')
const async = require('async')
const urlGenre = 'http://localhost:3010/genres'
const urlAlbum = 'http://localhost:3010/albums'
const urlTrack = 'http://localhost:3010/tracks'

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
            request(urlAlbum + '?AlbumId=' + track.AlbumId, (error, response, body) => {
              if (error) {
                return nextFetchAlbum(error)
              }

              let albums = JSON.parse(body)
              let album = albums[0]
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
}
```
