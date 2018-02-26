const path = require('path')
let config

exports.load = function (name) {
  config = require(path.join('../', 'games', name))
}
exports.get = () => config
