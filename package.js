Package.describe({
    summary: "Expose mongodb aggregation framework (mapReduce, aggregate and distinct), to SERVER side only.",
    version: '1.0.4',
    name: 'zvictor:mongodb-server-aggregation',
    git: 'https://github.com/zvictor/meteor-mongo-server.git'
});

Npm.depends({mongodb: "1.3.17"});

Package.on_use(function (api, where) {
    if(api.versionsFrom !== undefined) api.versionsFrom('METEOR@0.9.1');

    api.use('coffeescript', ['server']);
    api.use('underscore', ['server']);

    api.add_files('server.coffee', 'server');
});
