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
