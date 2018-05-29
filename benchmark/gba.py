import json
from urllib import request
response = request.urlopen('http://localhost:3000/genres').read()
genres = json.loads(response)
result = []
for genre in genres:
    genre_row = {'genre': genre['name'], 'books': []}
    response = request.urlopen('http://localhost:3000/books?genreId=' + str(genre['id'])).read()
    books = json.loads(response)
    for book in books:
        response = request.urlopen('http://localhost:3000/authors?id=' + str(book['authorId'])).read()
        authors = json.loads(response)
        genre_row['books'].append({'title': book['title'], 'author': authors[0]['name']})
    result.append(genre_row)
print(json.dumps(result))
