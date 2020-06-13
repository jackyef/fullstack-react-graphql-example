require('./init-env');

const withImages = require('next-images');

const config = {
  env: {
    BACKEND_HOST: process.env['BACKEND_HOST'],
  },
}

module.exports = withImages(config);