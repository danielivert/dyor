require('dotenv').config({ path: '../../.env' })
const withTM = require('next-transpile-modules')(['ui'])

module.exports = withTM({
  reactStrictMode: true,
})
