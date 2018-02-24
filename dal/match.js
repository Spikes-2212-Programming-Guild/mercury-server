let teamsCollection
let updateTeam
function insertMatch (match, teamNumber) {
  return new Promise((resolve, reject) => {
    const newMatch = Object.assign({}, match)
    delete newMatch.matchnumber
    const expression = {}
    expression[`matches.${match.matchnumber}`] = newMatch
    updateTeam(teamNumber, {$set: expression})
      .then(() => resolve)
      .catch(err => reject(err))
  })
}

function matchExists(teamNumber, matchNumber) {
  return new Promise((resolve, reject) => {
    const query = {number: teamNumber}
    query[`matches.${matchNumber}`] = {$exists: true}
    teamsCollection.findOne(query)
      .then(item =>
        resolve(!!item)
      )
      .catch(err => reject(err))
  })
}

module.exports = function (coll, update) {
  teamsCollection = coll
  updateTeam = update
  return {
    insertMatch,
    matchExists
  }
}
