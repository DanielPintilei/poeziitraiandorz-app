var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var dbConfig = require('./db.config')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DATABASE_URL: dbConfig.URL
})
