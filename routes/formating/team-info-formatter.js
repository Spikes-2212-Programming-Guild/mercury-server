
function prepareMatches (matches) {
  const res = []
  Object.keys(matches).forEach(matchNumber => {
    const match = matches[matchNumber]
    res.push(match)
  })
  return res
}

function extractQuestionData (question, matches, gameStage) {
  const answers = []
  matches.forEach(function (match) {
    const name = (question.name + gameStage).split(' ').join('').toLowerCase()
    answers.push(match[name])
  })
  return answers
}
module.exports = function (matches, gameConfig, params) {
  const data = prepareMatches(matches)

  const teamInfo = {}
  Object.keys(gameConfig).forEach(configKey => {
    gameConfig[configKey].forEach(question => {
      const name = (question.name + ' - ' + configKey)
      teamInfo[name] = {
        data: extractQuestionData(question, data, configKey),
        type: question.type
      }
      console.log(question.params)
      if (question.params) {
        if (question.params.options) teamInfo[name].options = question.params.options
      }
    })
  })
  if (params.matchNumber) {
    teamInfo['matchnumber'] = Object.keys(matches)
  }
  if (params.teamNumber) {
    teamInfo['teamNumber'] = params.teamNumber
  }

  return teamInfo
}
