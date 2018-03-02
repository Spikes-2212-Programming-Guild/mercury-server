const router = require('express').Router()
const insertMatchController = require('../bl/insert-match-controller')
const teamInfoController = require('../bl/team-info-controller')
const generalInfoController = require('../bl/general-info-controller')

router.post('/submit-match', function (req, res) {
  insertMatchController.insertMatch(req.body.match, req.body.force)
    .then(() => {
      res.end()
    })
    .catch(err => {
      res.status(406).send('match-already-saved')
      console.error(err)
      res.end()
    })
})

router.get('/info/all', function (req, res) {
  generalInfoController.getInfoForAllTeams()
    .then(info => {
      res.json(info)
      res.end()
    })
    .catch(err => {
      console.error(err)
      res.end()
    })
})

router.get('/info/:teamNumber', function (req, res) {
  const teamNumber = req.params.teamNumber
  teamInfoController.getTeamInfo(teamNumber)
    .then(teamInfo => {
      res.json(teamInfo)
      res.end()
    })
    .catch(err => {
      console.error(err)
      res.end()
    })
})

module.exports = router
