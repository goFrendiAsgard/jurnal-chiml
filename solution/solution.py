# filename: solution.py
# usage: python3 solution.py

import json
from urllib import request

response = request.urlopen('http://chiml-survey.herokuapp.com/genres').read()
genres = json.loads(response)

result = []
for genre in genres:
    result.append(genre['name'])

print(json.dumps(result))
