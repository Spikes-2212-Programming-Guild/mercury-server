
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
    Object.keys(info[teamNumber]).forEach(questiontName => {
      result[questiontName].data.push(info[teamNumber][questiontName])
      result[questiontName].labels.push(teamNumber)
    })
  })
  return result
}
