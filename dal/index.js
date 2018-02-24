const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const config = require('../config').mongo
let teamsCollection

MongoClient.connect(config.url)
  .then(client => {
    client.db(config.dbName).collection(config.collectionName, function (err, coll) {
      if (err) throw err
      else {
        teamsCollection = coll
        const teamUtils = require('./team')(teamsCollection)
        const matchUtils = require('./match')(teamsCollection, teamUtils.updateTeam)
        module.exports = {
          team: teamUtils,
          match: matchUtils
        }
      }
    })
  })
  .catch(err => {
    console.error(err)
  })
