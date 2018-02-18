const dbController = require('../dal')

function insertMatch (match) {
  return new Promise((resolve, reject) => {
    const teamNumber = match.teamNumber
    dbController.teamExists(teamNumber)
      .then(exists => {
        if (!exists) {
          dbController.insertTeam({number: teamNumber, matches: {}})
        }
        dbController.insertMatch(match, teamNumber)
          .then(() => resolve)
          .catch(err => reject(err))
      })
  })
}

module.exports = {insertMatch}
