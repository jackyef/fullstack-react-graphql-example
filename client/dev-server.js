require('./init-env');

const express = require('express')
const next = require('next')

const devProxy = {
  '/api': {
    target: `${process.env['BACKEND_HOST']}/api`,
    pathRewrite: { '^/api': '/' },
    changeOrigin: true,
  },
}

const port = 3000;
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: __dirname,
  dev,
})

const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
    server = express()

    // Set up proxy to backend
    if (dev && devProxy) {
      const proxyMiddleware = require('http-proxy-middleware')
      Object.keys(devProxy).forEach(function (context) {
        server.use(proxyMiddleware(context, devProxy[context]))
      })
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })