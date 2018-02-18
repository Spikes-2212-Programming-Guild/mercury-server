const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config.json')

const teamRouter = require('./routes/team')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/team', teamRouter)

app.listen(config.port, function () {
  console.log('started server on port ' + config.port)
})
