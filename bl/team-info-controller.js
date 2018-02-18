const dbController = require('../dal')

function insertMatch (match) {
  return new Promise((resolve, reject) => {
    const teamNumber = match.teamnumber
    dbController.teamExists(teamNumber)
      .then(exists => {
        if (!exists) {
          dbController.insertTeam({number: teamNumber, matches: {}})
        }
        dbController.matchExists(match.matchnumber, teamNumber)
          .then(matchExists => {
            if (!matchExists) {
              dbController.insertMatch(match, teamNumber)
                .then(() => resolve())
                .catch(err => reject(err))
            } else {
              reject(Error('Match Was Already Saved'))
            }
          })
      })
  })
}

module.exports = {insertMatch}
