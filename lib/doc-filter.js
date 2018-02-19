const { filter, head, last, pathOr, split } = require('ramda')

function docFilt(req, res) {
  var filterFn = null
  if (pathOr(null, ['query', 's'], req)) {
    const filterProp = head(split(':', req.query.s))
    const filterVal = last(split(':', req.query.s))

    filterFn = result =>
      res.send(filter(doc => doc[filterProp] == filterVal, result))
  } else {
    filterFn = result => res.send(result)
  }
  return filterFn
}

module.exports = docFilt
