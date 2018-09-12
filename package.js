Package.describe({
  summary: 'Expose mongodb aggregation framework (mapReduce, aggregate and distinct), to SERVER side only.',
  version: '1.0.0',
  name: 'asoares:mongodb-mapreduce-aggregation',
  git: 'https://github.com/soaresa/meteor-mongodb-mapreduce-aggregation'
})

Package.onUse(function (api) {
  api.versionsFrom('1.7.0.5')
  api.use('meteor')
  api.addFiles('server.js', 'server')
})
