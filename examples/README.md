# Scenario

We want to compare `HTTP-API`, `GraphQL`, `BPEL`, and `CHIML` in order to fetch data from database.

The database used is [Chinook sample database](http://www.sqlitetutorial.net/sqlite-sample-database/). The structure of the database is as follow:

![Database Diagram](components/sqlite-sample-database-diagram.png)

In this scenario our goal is to group `tracks` based on the `genres`. For every track we will show it's track name and it's album title.

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
# Requirement

* Sqlite3
* Node.Js
* Chimera-Framework

# Table Fetcher

To fetch data from the table, we have build two version of table fetcher. The terminal-interface and the web-service

## Terminal Interface

The terminal interface is located at `components/program.js`.

To use the terminal interface, you can invoke `node components/terminal-interface.js <tableName> <filter>`

__Example:__

```bash
gofrendi@asgard:~$ node components/terminal-interface.js genres "{\"Name\":\"Rock\"}"
[{"GenreId":1,"Name":"Rock"}]
```

## Web Service

The web service is located at `components/web-service.js`.

To start the web service, you can invoke `node components/web-service.js` 

After the service started, you can send a GET request using this format `/<tableName>?<fieldName>=<value>`

__Example:__

```
URL: http://localhost:3010/genres?Name=Rock
RESULT: [{"GenreId":1,"Name":"Rock"}]
```

# CHIML Terminal Client

Unlike the other alternatives, CHIML doesn't require web-service to run in the computer.
