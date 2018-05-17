# filename: api.web.py
# usage: python api.web.py
import json
from urllib import request

urlGenre = 'http://localhost:3010/genres'
urlAlbum = 'http://localhost:3010/albums'
urlTrack = 'http://localhost:3010/tracks'

response = request.urlopen(urlGenre).read()
originalGenres = json.loads(response)

genres = []
for originalGenre in originalGenres:
    genre = {'GenreName': originalGenre['Name'], 'tracks': []}
    # get tracks
    genreId = str(originalGenre['GenreId'])
    response = request.urlopen(urlTrack + '?GenreId=' + genreId).read()
    originalTracks = json.loads(response)
    tracks = []
    for originalTrack in originalTracks:
        albumId = str(originalTrack['AlbumId'])
        response = request.urlopen(urlAlbum + '?AlbumId=' + albumId).read()
        # get album
        albums = json.loads(response)
        album = albums[0]
        tracks.append({
            'TrackName': originalTrack['Name'],
            'AlbumTitle': album['Title']
        })
    genre['tracks'] = tracks
    genres.append(genre)

print(json.dumps(genres))
