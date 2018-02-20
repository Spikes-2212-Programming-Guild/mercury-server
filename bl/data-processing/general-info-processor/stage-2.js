
module.exports = function (info) {
  const teamNumbers = Object.keys(info)
  const result = {}
  Object.keys(info[teamNumbers[0]]).forEach(questionName => {
    result[questionName] = {
      data: [],
      labels: []
    }
  })
  teamNumbers.forEach(teamNumber => {
    Object.keys(info[teamNumber]).forEach(questionName => {
      result[questionName].data.push(info[teamNumber][questionName])
      result[questionName].labels.push(teamNumber)
    })
  })
  return result
}
