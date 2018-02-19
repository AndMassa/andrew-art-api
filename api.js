require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const docFilt = require('./lib/doc-filter')

const {
  not,
  isEmpty,
  head,
  last
} = require('ramda')


const {
  addPainting,
  deletePainting,
  getPainting,
  updatePainting,
  addArtist,
  deleteArtist,
  getArtist,
  updateArtist
} = require('./dal.js')

// Used to clean object //
const checkFields = require('./lib/required-fields.js')
const cleanObj = require('./lib/remover.js')
const cleaner = cleanObj([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])
const artClean = cleanObj(['name', 'movement', 'born'])
const artCleanUp = cleanObj([
  '_id',
  '_rev',
  'name',
  'movement',
  'born',
  'type'
])
const cleanUp = cleanObj([
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  'type'
])
const reqFields = checkFields([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])

// Used to check the fields //
const reqFieldArt = checkFields(['born', 'name', 'movement'])
const reqFieldArtUp = checkFields([
  '_id',
  '_rev',
  'born',
  'name',
  'movement',
  'type'
])
const reqFieldUp = checkFields([
  '_id',
  '_rev',
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  'type'
])

app.use(bodyParser.json())

// Introduction to API //
app.get('/', function(req, res, next) {
  res.send(`<h1>Welcome to AndrewArt, the magnificent API!</h1>`)
})

// Function for handling errors //
const errNextr = next => err =>
  next(new HTTPError(err.status, err.message, err))

// ---Paintings--- //

// Add a painting //
app.post('/paintings', (req, res, next) => {
  if (not(isEmpty(reqFields(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the following required fields: ${reqFields(req.body)}`
      )
    )
    return
  } else {
    addPainting(cleaner(req.body))
      .then(newPainting => res.send(newPainting))
      .catch(errNextr(next))
  }
})

// Delete a painting //
app.delete('/paintings/:id', (req, res, next) => {
  deletePainting(req.params.id)
    .then(delResult => res.send(delResult))
    .catch(errNextr(next))
})

// Retrieve a painting //
app.get('/paintings/:id', (req, res, next) => {
  getPainting(req.params.id)
    .then(painting => res.send(painting))
    .catch(errNextr(next))
})

// Update a painting //
app.put('/paintings/:id', (req, res, next) => {
  if (not(isEmpty(reqFieldUp(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the following required fields: ${reqFields(req.body)}`
      )
    )
    return
  } else {
    return updatePainting(cleanUp(req.body))
      .then(newPainting => res.send(newPainting))
      .catch(errNextr(next))
  }
})

// ---Artists--- //

// Adding an artist //
app.post('/artists', (req, res, next) => {
  if (not(isEmpty(reqFieldArt(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the following required fields: ${reqFieldArt(req.body)}`
      )
    )
    return
  } else {
    return addArtist(artClean(req.body))
      .then(result => res.send(result))
      .catch(errNextr(next))
  }
})

// Deleting and artist //
app.delete('/artists/:id', (req, res, next) => {
  deleteArtist(req.params.id)
    .then(delResult => res.send(delResult))
    .catch(errNextr(next))
})

// Retrieving an artist //
app.get('/artists/:id', (req, res, next) => {
  getArtist(req.params.id)
    .then(artist => res.send(artist))
    .catch(errNextr(next))
})

// Updating and artist //
app.put('/artists/:id', (req, res, next) => {
  if (not(isEmpty(reqFieldArtUp(req.body)))) {
    next(
      new HTTPError(
        400,
        `You are missing the following required fields: ${reqFieldArtUp(
          req.body
        )}`
      )
    )
    return
  }
  updateArtist(artCleanUp(req.body))
    .then(updatedResult => res.send(updatedResult))
    .catch(errNextr(next))
})

// End //


app.use((err, req, res, next) => {
  res.status(err.status).send(err.message)
})

// Confirmation that API is running on port 4000 //
app.listen(port, () => console.log('AndrewArt is up and running on port: ', port))
