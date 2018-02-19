# Welcome to AndrewArt - the most comprehensive and coherent artistry API!

## Getting started!

```

1) First you will want to create a database - you can do this by going to Cloudand and signing up for free access, or by using Roo by typing "roo db add (name of your db)".


```

2) You will then want to clone my repo to your machine by typing "git clone https://github.com/AndMassa/art-api-exam-nolist (optional name)" in your console, making sure it is cloned into the correct folder.

```

3) You will then want to navigate to the repo by typing "cd (repo name)" and install dependencies by typing "npm install".

```

4) You will want to establish environmental variables by creating an ".env" file, making sure to include your key and secret in the COUCHDB_URL= field, as well as your port of choice in in the PORT= field.

Example: COUCHDB_URL=https://key:secret@url

```

5) Afterwards you will want to load your data to your database by running the "npm run load" command in your console.

Example:
$ npm run load
$ npm start

```

6) After a successful load, you will want to start the API by running the "npm start" command in your console.

```

## BASE URL
https://localhost:4000 welcomes you to the home of the API!

|API|
|All paintings| =>   |/paintings|
|Single painting| => |/paintings/:id|
|All artists| =>     |/artists|
|Single artist| =>   |/aritsts/:id|


## HTTP VERBS
Here are the verbs included in the API with a brief description of each.

|    VERBS   |	PURPOSE
|    GET    |   Retrieve a painting / artist
|   DELETE  |   Delete a painting / artist
|    PUT    |   Update a painting / artist
|   POST    |   Create a painting / artist

## SCHEME

AndrewArt uses HTTP to communicate.

## CONTENT TYPE

AndrewArt sends and receives data as JSON, except for the homepage which is HTML.

## HTTP STATUS

200 - Ok: Everything went according to plan.

201 - Created: You successfully created an artist or a painting.

400 - Bad Request: Potential user error, possible incorrect or missing fields.

404 - Not Found: Invalid or incorrect URL.

409 - Conflict: Doc / action already exists and cannot be changed without including ID and REV.

500 - Internal server error: Something went wrong... on the API side.
