const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const config = require('../config').mongo
let teamsCollection

function getTeam (number) {
  return new Promise((resolve, reject) => {
    teamsCollection.findOne({number: number})
      .then(team => {
        if (!team) {
          const err = Error(`Team ${number} dosen't exist`)
          err.name = 'no-team-found'
          reject(err)
        } else {
          resolve(team)
        }
      })
      .catch(err => reject(err))
  })
}

function insertTeam (team) {
  teamsCollection.insertOne(team)
}

function updateTeam (number, updateQuery) {
  teamsCollection.updateOne({number: number}, updateQuery)
    .catch(err => console.error(err))
}

function removeTeam (number) {
  teamsCollection.removeOne({number: number})
}

function insertMatch (match, teamNumber) {
  return new Promise((resolve, reject) => {
    const newMatch = Object.assign({}, match)
    delete newMatch.matchnumber
    const expression = {}
    expression[`matches.${match.matchnumber}`] = newMatch
    updateTeam(teamNumber, {$set: expression})
    resolve()
  })
}

function matchExists (matchNumber, teamNumber) {
  return new Promise((resolve, reject) => {
    const query = {number: teamNumber}
    query[`matches.${matchNumber}`] = {$exists: true}
    teamsCollection.findOne(query)
      .then(item =>
        resolve(!!item)
      )
      .catch(err => reject(err))
  })
}

function teamExists (number) {
  return new Promise((resolve, reject) => {
    getTeam(number)
      .then(() => resolve(true))
      .catch(() => resolve(false))
  })
}

function getAllTeams () {
  return new Promise((resolve, reject) => {
    teamsCollection.find({}).project({_id: 0}).toArray(function (err, arr) {
      if (err) reject(err)
      else {
        resolve(arr)
      }
    })
  })
}

MongoClient.connect(config.url)
  .then(client => {
    client.db(config.dbName).collection(config.collectionName, function (err, coll) {
      if (err) throw err
      else {
        teamsCollection = coll
      }
    })
  })
  .catch(err => {
    console.error(err)
  })
module.exports = {
  matchExists,
  insertMatch,
  insertTeam,
  updateTeam,
  getTeam,
  removeTeam,
  teamExists,
  getAllTeams
}
