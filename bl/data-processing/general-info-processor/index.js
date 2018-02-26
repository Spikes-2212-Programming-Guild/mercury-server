const stage1Parser = require('./stage-1')
const stage2Parser = require('./stage-2')
const stage3Parser = require('./stage-3')

function prepare (info) {
  const result = {}
  info.forEach(teamData => {
    const number = teamData.teamNumber
    delete teamData.teamNumber
    result[number] = teamData
  })
  return result
}

module.exports = function (teamInfo) {
  return new Promise(function (resolve) {
    const result = stage3Parser(stage2Parser(stage1Parser(prepare(teamInfo))))
    resolve(result)
  })
}
