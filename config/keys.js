// CHECK BETWEEN PRODUCTION AND DEVELOPMENT
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
