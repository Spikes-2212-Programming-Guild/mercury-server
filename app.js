const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config.json')

const teamRouter = require('./routes/team')
const gameConfigRouter = require('./routes/game-config')

const gameConfigManager = require('./dal').config
gameConfigManager.load(config.gameName)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/team', teamRouter)
app.use('/api/game-config', gameConfigRouter)

app.listen(config.port, function () {
  console.log('started server on port ' + config.port)
})
