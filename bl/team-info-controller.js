const dbController = require('../dal')
const teamInfoProcessor = require('../routes/formating/team-info-formatter')
const gameConfigManager = require('../dal/').config

function getTeamInfo (number) {
  return new Promise((resolve, reject) => {
    dbController.team.teamExists(number)
      .then(exists => {
        if (!exists) reject(Error(`Team ${number} Dosen't exist`))
        else {
          dbController.team.getTeam(number)
            .then(team => {
              resolve(teamInfoProcessor(team.matches, gameConfigManager.get(), {matchNumber: true}))
            })
            .catch(err => reject(err))
        }
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  getTeamInfo
}
