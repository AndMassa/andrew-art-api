require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL)
const sluggy = require('slugify')
const { pluck, prop } = require('ramda')

const idCleaner = require('./lib/id-cleaner.js')


// Consts for adding, deleting, getting and updating 

const addPainting = painting => { // Adds a painting (POST)
  painting._id = `painting_${sluggy(idCleaner(painting.name), { lower: true })}`
  painting.type = 'painting'
  return db.put(painting)
}
const deletePainting = id => db.get(id).then(painting => db.remove(painting)) // Deletes a painting (DELETE)
const getPainting = id => db.get(id) // Gets a painting (GET)
const updatePainting = painting => db.put(painting) // Updates a painting (PUT)

const addArtist = artist => { // Adds an artist (POST)
  artist._id = `artist_${sluggy(artist.name, { lower: true })}`
  artist.type = 'artist'
  return db.put(artist)
}
const deleteArtist = id => db.get(id).then(artist => db.remove(artist)) // Deletes an artist (DELETE)
const getArtist = id => db.get(id) // Get an artist (GET)
const updateArtist = artist => db.put(artist) // Update an artist (PUT)





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
