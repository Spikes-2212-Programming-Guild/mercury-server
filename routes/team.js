const router = require('express').Router()
const teamController = require('../bl/team-info-controller')

router.post('/submit-match', function (req, res) {
  teamController.insertMatch(req.body.match)
    .then(() => {
      res.end()
    })
    .catch(err => {
      console.error(err)
      res.end()
    })
})

module.exports = router
