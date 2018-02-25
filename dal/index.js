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
        const teamUtilsInstance = teamUtils(teamsCollection)
        exports.team = teamUtilsInstance
        exports.match = matchUtils(teamsCollection, teamUtilsInstance.updateTeam)
      }
    })
  })
  .catch(err => {
    console.error(err)
  })

const teamUtils = require('./team')
const matchUtils = require('./match')
