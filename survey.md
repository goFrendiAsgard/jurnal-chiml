# CHIML Survey Description

This survey involve `instructors` and `respondents`. Instructors should be someone who knows how CHIML works and able to explain it to the respondent before the survey is conducted. There are several steps need to be done by the instructors and the respondents. The respondents has to know how to deal with HTTP API.

## Preparation (~ 30 minutes)

The instructor explains:

* The nature of this research: We want to measure how usable and readable is CHIML
* Chimera-Framework: How to use and install it. The resource is available online [here](https://github.com/goFrendiAsgard/chimera-framework/wiki)
* CHIML: The basic structure of the language. The specification is also availabe online [here](https://github.com/goFrendiAsgard/chimera-framework/wiki/CHIML)

## Web Service Explanation (~ 10 minutes)

The instructor explains the pre-deployed web-service. The web-service will give response based on `GET` request. The specification of the API is as follow:

```
// SELECT * FROM <tableName>
http://chiml-survey.herokuapp.com/<tableName>

// SELECT * FROM <tableName> WHERE <field>=<value>
http://chiml-survey.herokuapp.com/<tableName>?<field>=<value>&
```

The API expose 3 tables:

```yaml
TABLE: genres
FIELDS:
  - id
  - name

TABLE: books
FIELDS:
  - id
  - title
  - genreId
  - authorId

TABLE: author
FIELDS:
  - id
  - name
```

The response will be an `array of object` in pretty-printed JSON format. Example:

```
http://chiml-survey.herokuapp.com/genres
```

```json
[
  {
    "id": 1,
    "name": "fiction",
  },
  {
    "id": 2,
    "name": "history",
  },
  {
    "id": 2,
    "name": "textbook",
  }
]
```

## Task (~ Depend on the respondent)

The instructors ask respondents to build 2 programs to fetch data from the web-service.

* The first program can be written in any programming language/technology aside from CHIML
* The second program should be written in CHIML

### Task Example

Below is the task example. The `requirement` and `expected result` are already provided by the instructors. Respondents need to provide two versions of solution named `solution 1` and `solution 2`

#### Requirement

Show an array containing genre's names

#### Expected Result

```json
["fiction", "history", "textbook"]
```

#### Solution 1 (Python3)

Suppose the respondent is proficient in Python, the solution could be like this:

```python
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
```

or a more functional approach:

```python
# filename: solution-functional.py
# usage: python3 solution-functional.py

import json
from urllib import request

response = request.urlopen('http://chiml-survey.herokuapp.com/genres').read()
genres = json.loads(response)

result = list(map(lambda genre: genre['name'], genres))

print(json.dumps(result))
```

#### Solution 2 (CHIML)

For the second solution, respondent should try to provide the solution in CHIML format.
To make it easier, the respondent can access `http://chiml-survey.herokuapp.com`

```yaml
# filename: solution.chiml
# usage: chimera solution.chiml

out: results
do:

  - |('http://chiml-survey.herokuapp.com/genres') -> [$.httpRequest] -> response
  - |(response.body) --> genres

  - |([]) --> results

  - |i <-- 0
  - while: i < genres.length
    do:
      - |results[i] <-- (genres[i].name)
      - |i <-- (i+1)
```

or a more functional approach

```yaml
# filename: solution-functional.chiml
# usage: chimera solution-functional.chiml

out: results
do:

  - |('http://chiml-survey.herokuapp.com/genres') -> [$.httpRequest] -> response
  - |(response.body) --> genres

  - map: genres
    into: results
    do: |(genre) -> {(x) => x.name} -> result
```

## Survey

After finishing the task, the respondents should fill up the surveys in the google forms
The questions are as follow:

1. From the scale 1-5, How familiar are you with `web service`

    - 1 - Never know about it
    - 2 - Know it, but never use it
    - 3 - Somehow familiar
    - 4 - Familiar
    - 5 - Very familiar

2. From the scale 1-5, How familiar are you with `functional programming` (i.e: `map`, `reduce`, and `filter`)

    - 1 - Never know about it
    - 2 - Know it, but never use it
    - 3 - Somehow familiar
    - 4 - Familiar
    - 5 - Very familiar


3. Do you able to provide the 1st solution?

    - Yes (please provide link on gist, github, pastebin, dropbox, or google drive)
    - No

4. How long do you need to build the 1st solution?

    - Less than an hour
    - More than an hour but less than a day
    - More than a day

5. Do you able to provide the 2nd solution?

    - Yes (please provide link on gist, github, pastebin, dropbox, or google drive)
    - No

6. How long do you need to build the 2nd solution?

    - Less than an hour
    - More than an hour but less than a day
    - More than a day

7. From scale 1-5, How readable your 1st solution is?

    - Not readable
    - Need some time to understand
    - Somehow readable
    - Readable
    - Very readable

8. From scale 1-5, How readable your 2nd solution is?

    - Not readable
    - Need some time to understand
    - Somehow readable
    - Readable
    - Very readable

9. Suppose you get a job related to web-service. Which one would you like to use?

    - 1st solution
    - 2nd solution

10. Suppose you get a hobby project related to web-service. Which one would you like to use?

    - 1st solution
    - 2nd solution

11. Suppose you have to teach someone about web-service. Which one would you like to show?

    - 1st solution
    - 2nd solution

12. According to your opinion, what are the main disadvantages of using CHIML (you can choose more than one)?

    - CHIML script is difficult to read
    - Chimera-Framework installation is challanging
    - The performance is quite slow
    - No community/company backup
    - Others

# Task 

## Requirement

Show an array of object. Each element of the array should has two keys named `genre` and `books`.
The value of `books` should be another array of object which each element contains two other keys named `title` and `author`. The books are grouped by it's genre, and the author name should be provided for each book.

## Expected Result

```json
[
  {
    "genre": "fiction",
    "books": [
      {"title": "Rise of The Rebels", "author": "Michael Kogge"},
      {"title": "A New Dawn", "author": "John Jackson Miller"},
    ]
  },
  {
    "genre": "history",
    "books": [
      {"title": "John Adams", "author": "David McCullough"},
      {"title": "1776", "author": "David McCullough"},
    ]
  },
  {
    "genre": "science",
    "books": [
      {"title": "Brief History of Time", "author": "Stephen Hawking"},
      {"title": "Grand Design", "author": "Stephen Hawking"},
    ]
  }
]
```

# Survey

The respondent should fill up the survey [here](https://goo.gl/forms/CXiQ2MgoZokOjBKg2)
