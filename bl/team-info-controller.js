const dbController = require('../dal')

function insertMatch (match) {
  return new Promise((resolve, reject) => {
    const teamNumber = match.teamNumber
    dbController.matchExists(match.number, teamNumber)
      .then(exists => {
        if (exists) {
          const err = Error(`Match ${match.number} for team ${teamNumber} was already saved`)
          err.name = 'match-already-saved'
          reject(err)
        } else {
          dbController.insertMatch(match, teamNumber)
            .then(() => resolve())
            .catch(err => reject(err))
        }
      })
      .catch(err => reject(err))
  })
}

module.exports = {insertMatch}
