const parsers = {
  number: (question) => {
    const result = {}
    let avg = 0
    question.data = question.data.map((item) => parseInt(item))
    question.data = question.data.sort((a, b) => a - b)
    question.data.map((item) => {
      avg += item
    })
    result.max = question.data[question.data.length - 1]
    result.avg = avg / question.data.length
    return result
  },
  enum: (question) => {
    const result = {}
    question.options.forEach(dataItem => { result[dataItem] = 0 })
    question.data.forEach(dataItem => {
      if (result[dataItem] || result[dataItem] === 0) {
        result[dataItem] += 1
      }
    })
    return result
  }
}

/**
 * This is the first stage of parsing data from a database format to the format that would be presented as a chart.
 * At this stage, the data would ne transformed from :
 *        "{
 *          TeamNumber:
  *          {
  *           Question:
  *             data:
   *             [res1, res2, res3]
   *         }
   *      }"
 *  to :
 *    {
 *      TeamNumber:
 *        {
 *          Question: {
 *            data: {
 *            res1: 1,
 *            res2: 1,
 *            res3: 1
 *            }
 *        }
 *    }
 * @param info
 * @returns {{}}
 */

module.exports = function parseStage1 (info) {
  const infoByQuestion = {}
  Object.keys(info).forEach(teamNumber => {
    const teamInfo = info[teamNumber]
    const teamResult = {}
    Object.keys(teamInfo).forEach(questionName => {
      const question = teamInfo[questionName]
      if (question.type === 'boolean') {
        question.options = ['Yes', 'No']
        teamResult[questionName] = parsers['enum'](question)
      } else {
        teamResult[questionName] = parsers[question.type](question)
      }
    })
    infoByQuestion[teamNumber] = teamResult
  })
  return infoByQuestion
}
