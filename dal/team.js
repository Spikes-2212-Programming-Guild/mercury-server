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
module.exports = function (coll) {
  teamsCollection = coll
  return {
    getTeam,
    insertTeam,
    updateTeam,
    removeTeam,
    teamExists,
    getAllTeams
  }
}
