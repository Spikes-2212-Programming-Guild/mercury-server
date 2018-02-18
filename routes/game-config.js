const router = require('express').Router()

const gameConfigManager = require('../dal/game-config-manager')

router.get('/', function (req, res) {
  res.json(gameConfigManager.get())
})
module.exports = router
