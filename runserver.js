const path = require('path')
const parseArgs = require('minimist')

const argv = parseArgs(process.argv.slice(2), { string: 'mode' })

const mode = argv['mode']

const env = require(
  mode === 'production' ? './.env/prod.json' : './.env/dev.json'
)

for (const [envVar, value] of Object.entries(env)) {
  process.env[envVar] = value
}

if (mode === 'production') {
  require('./dist/server.js') // starts the production server
} else {
  console.log('watching src...')
  const watcher = require('chokidar').watch('./src')
  watcher.on('all', (event, filename) => {
    delete require.cache[path.resolve(filename)]
  })
  console.log('building dev bundle...')
  require('webpack')({ // builds and watches bundle
    ...require('./webpack.config')(null, { mode }),
    watch: true,
  }, (err, stats) => {
    if (err) throw err
    if (stats.hasErrors()) {
      stats.compilation.errors.forEach((err) => {
        console.error(err)
      }) 
      process.exit(1)
    }
  })
  require('@babel/register')
  require('./src/server.jsx') // starts the dev server
}
