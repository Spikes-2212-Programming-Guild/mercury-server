const router = require('express').Router()
const insertMatchController = require('../bl/insert-match-controller')

router.post('/submit-match', function (req, res) {
  insertMatchController.insertMatch(req.body.match)
    .then(() => {
      res.end()
    })
    .catch(err => {
      res.status(406).send('match-already-saved')
      console.error(err)
      res.end()
    })
})

module.exports = router
