const dbController = require('../dal')
const teamInfoProcessor = require('../routes/formating/team-info-formatter')
const generalInfoProcessor = require('./data-processing/general-info-processor')
const gameConfigManager = require('../dal/game-config-manager')

function getInfoForAllTeams () {
  return new Promise((resolve, reject) => {
    dbController.team.getAllTeams()
      .then(teams => {
        console.log(teams)
        const parsed = (teams).map((team) => teamInfoProcessor(team.matches, gameConfigManager.get(), {teamNumber: team.number}))
        resolve(generalInfoProcessor(parsed))
      })
      .catch(err => reject(err))
  })
}

module.exports = {getInfoForAllTeams}
