require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL)
const sluggy = require('slugify')
const { pluck, prop } = require('ramda')

const idCleaner = require('./lib/id-cleaner.js')

// Paintings //

// Adds a painting (POST) //
const addPainting = painting => {
  painting._id = `painting_${sluggy(idCleaner(painting.name), { lower: true })}`
  painting.type = 'painting'
  return db.put(painting)
}
// Deletes a painting (DELETE) //
const deletePainting = id => db.get(id).then(painting => db.remove(painting))
// Retrieves a painting (GET) //
const getPainting = id => db.get(id)
// Updates a painting (PUT) //
const updatePainting = painting => db.put(painting)

// Artists //

// Adds an artist (POST) //
const addArtist = artist => {
  artist._id = `artist_${sluggy(artist.name, { lower: true })}`
  artist.type = 'artist'
  return db.put(artist)
}

// Deletes an artist (DELETE) //
const deleteArtist = id => db.get(id).then(artist => db.remove(artist))

// Retrieves an artist (GET) //
const getArtist = id => db.get(id)

// Update an artist (PUT) //
const updateArtist = artist => db.put(artist)





module.exports = {
  addArtist,
  deleteArtist,
  getArtist,
  updateArtist,
  addPainting,
  deletePainting,
  getPainting,
  updatePainting
}
