
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
  if (params.matchNumber) {
    teamInfo['matchnumber'] = {data: Object.keys(matches), type: 'number'}
  }
  Object.keys(gameConfig).forEach(configKey => {
    gameConfig[configKey].forEach(question => {
      teamInfo[question.name] = {
        data: extractQuestionData(question, data, configKey),
        type: question.type
      }
      if (question.params) {
        if (question.params.options) teamInfo[question.name].options = question.params.options
      }
    })
  })

  if (params.teamNumber) {
    teamInfo['teamNumber'] = params.teamNumber
  }

  return teamInfo
}
