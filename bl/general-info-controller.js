const dbController = require('../dal')
const teamInfoProcessor = require('./data-processing/team-info-processor')
const generalInfoProcessor = require('./data-processing/general-info-processor')
const gameConfigManager = require('../dal/game-config-manager')

function getInfoForAllTeams () {
  return new Promise((resolve, reject) => {
    dbController.getAllTeams()
      .then(teams => {
        console.log(teams)
        const parsed = (teams).map((team) => teamInfoProcessor(team.matches, gameConfigManager.get(), {teamNumber: team.number}))
        resolve(generalInfoProcessor(parsed))
      })
      .catch(err => reject(err))
  })
}

module.exports = {getInfoForAllTeams}
