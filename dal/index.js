const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const config = require('../config').mongo
let teamsCollection

function getTeam (number) {
  return new Promise((resolve, reject) => {
    teamsCollection.findOne({number: number}, {_id: 0})
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
  return teamsCollection.insertOne(team)
}

function updateTeam (number, updateQuery) {
  return teamsCollection.updateOne({number: number}, updateQuery)
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
      .then(() => resolve)
      .catch(err => reject(err))
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
      .then((item) => resolve(!!item))
      .catch((err) => {
        if (err.name === 'no-team-found') resolve(false)
        else reject(err)
      })
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
