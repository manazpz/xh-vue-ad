'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.106.177.213:8083/aq"',
  RESOURCE_URL: '"http://47.106.177.213:8081/contract"',
})

