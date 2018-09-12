const tl = typeof TLog !== 'undefined' && TLog !== null ? TLog.getLogger() : void 0
const path = Npm.require('path')
const Future = Npm.require(path.join('fibers', 'future'))
const _dummyCollection_ = new Meteor.Collection('__dummy__')

const _futureWrapper = function (collection, commandName, args) {
  var cb, col, coll1, collectionName, future, result
  col = (typeof collection) === 'string' ? _dummyCollection_ : collection
  collectionName = (typeof collection) === 'string' ? collection : collection._name
  coll1 = col.find()._mongo.db.collection(collectionName)
  future = new Future()
  cb = future.resolver()
  args = args.slice()
  args.push(cb)
  coll1[commandName].apply(coll1, args)
  return result = future.wait()
}

const _callMapReduce = function (collection, map, reduce, options) {
  var col, coll1, collectionName, future, result
  col = (typeof collection) === 'string' ? _dummyCollection_ : collection
  collectionName = (typeof collection) === 'string' ? collection : collection._name
  if (tl != null) {
    tl.debug('callMapReduce called for collection ' + collectionName + ' map: ' + map + ' reduce: ' + reduce + (' options: ' + (JSON.stringify(options))))
  }
  coll1 = col.find()._mongo.db.collection(collectionName)
  future = new Future()
  coll1.mapReduce(map, reduce, options, function (err, result, stats) {
    var res
    if (err) {
      future['throw'](err)
    }
    res = {
      collectionName: result.collectionName,
      stats: stats
    }
    return future['return']([true, res])
  })
  result = future.wait()
  if (!result[0]) {
    throw result[1]
  }
  return result[1]
}

Object.assign(Meteor.Collection.prototype, {
  distinct: function (key, query, options) {
    return _futureWrapper(this._name, 'distinct', [key, query, options])
  },
  aggregate: function (pipeline) {
    return _futureWrapper(this._name, 'aggregate', [pipeline])
  },
  mapReduce: function (map, reduce, options) {
    options = options || {}
    options.readPreference = 'primary'
    return _callMapReduce(this._name, map, reduce, options)
  }
})
