# filename: solution-functional.py
# usage: python3 solution-functional.py

import json
from urllib import request

response = request.urlopen('http://chiml-survey.herokuapp.com/genres').read()
genres = json.loads(response)

result = list(map(lambda genre: genre['name'], genres))

print(json.dumps(result))
