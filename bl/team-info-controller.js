const dbController = require('../dal')
const teamInfoProcessor = require('./data-processing/team-info-processor')
const gameConfigManager = require('../dal/game-config-manager')

function getTeamInfo (number) {
  return new Promise((resolve, reject) => {
    dbController.teamExists(number)
      .then(exists => {
        if (!exists) reject(Error(`Team ${number} Dosen't exist`))
        else {
          dbController.getTeam(number)
            .then(team => {
              resolve(teamInfoProcessor(team.matches, gameConfigManager.get()))
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
