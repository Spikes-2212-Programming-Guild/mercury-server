const dbController = require('../dal')

function insertMatch (match, force = false) {
  return new Promise((resolve, reject) => {
    function saveMatch (teamNumber) {
      dbController.match.matchExists(teamNumber, match.matchnumber)
        .then(matchExists => {
          if (!matchExists || force) {
            console.log('Saving Match')
            delete match.teamnumber
            dbController.match.insertMatch(match, teamNumber)
              .then(() => resolve())
              .catch(err => reject(err))
          } else {
            reject(Error('Match Was Already Saved'))
          }
        })
        .catch(err => reject(err))
    }
    const teamNumber = match.teamnumber
    dbController.team.teamExists(teamNumber)
      .then(exists => {
        if (!exists) {
          dbController.team.insertTeam({number: teamNumber, matches: {}})
            .then(() => saveMatch(teamNumber))
        } else {
          saveMatch(teamNumber)
        }
      })
      .catch(err => reject(err))
  })
}

module.exports = {insertMatch}
