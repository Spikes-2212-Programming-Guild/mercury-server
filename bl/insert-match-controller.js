const dbController = require('../dal')

function insertMatch (match) {
  return new Promise((resolve, reject) => {
    function saveMatch (teamNumber) {
      dbController.match.matchExists(match.matchnumber, teamNumber)
        .then(matchExists => {
          if (!matchExists) {
            delete match.teamnumber;
            dbController.insertMatch(match, teamNumber)
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
          dbController.insertTeam({number: teamNumber, matches: {}})
            .then(() => saveMatch())
        } else {
          saveMatch(teamNumber)
        }
      })
      .catch(err => reject(err))
  })
}

module.exports = {insertMatch}
