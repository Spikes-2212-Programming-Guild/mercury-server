
module.exports = function (info) {
  const result = {}

  Object.keys(info).forEach(questionName => {
    result[questionName] = {}
  })
  Object.keys(info).forEach(questionName => {
    const question = info[questionName]

    question.data.forEach(dataItem => {
      Object.keys(dataItem).forEach(dataItemKey => {
        if (!result[questionName][dataItemKey]) result[questionName][dataItemKey] = []
        result[questionName][dataItemKey].push(dataItem[dataItemKey])
      })
    })
    result.labels = question.labels
  })

  return result
}
