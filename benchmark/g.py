import json
from urllib import request
response = request.urlopen('http://localhost:3000/genres').read()
genres = json.loads(response)
result = list(map(lambda genre: genre['name'], genres))
print(json.dumps(result))
