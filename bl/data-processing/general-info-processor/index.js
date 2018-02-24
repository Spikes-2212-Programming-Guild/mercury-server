const stage1Parser = require('./stage-1')
const stage2Parser = require('./stage-2')
const stage3Parser = require('./stage-3')

module.exports = function (teamInfo) {
  return new Promise(function (resolve) {
    const result = stage3Parser(stage2Parser(stage1Parser(teamInfo)))
    resolve(result)
  })
}
