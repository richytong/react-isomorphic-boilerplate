import express from 'express'
import compression from 'compression'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import { StyleSheetServer } from 'aphrodite'
import routes from './routes'
import Layout from './components/Layout'
import createStore from './store'

const app = express()

app.use(compression())
app.use(express.static(path.resolve(__dirname, '../build')))
app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/hz/alive', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send('1')
})

app.get('/*', async (req, res) => {
  const context = {}
  const store = createStore()
  let match
  for (const route of routes) {
    match = matchPath(req.path, route)
    if (match) {
      if (route.component.dataFetch) {
        const params = Object.keys(match.params).length === 0 ? undefined : match.params
        await store.dispatch(route.component.dataFetch(params, req.query))
      }
      break
    }
  }
  const jsx = (
    <Provider store={ store }>
      <StaticRouter context={ context } location={ req.url }>
        <Layout />
      </StaticRouter>
    </Provider>
  )
  const { html: reactDom, css } = StyleSheetServer.renderStatic(() => renderToString(jsx))
  const reduxState = store.getState()
  const helmetData = Helmet.renderStatic()
  const bundleUrl = `//${req.headers.host}/app.bundle.js` // serving bundle from this webserver
  const statusCode = context.status || 200
  res.writeHead(statusCode, { 'Content-Type': 'text/html' })
  return res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${helmetData.title.toString()}
      ${helmetData.meta.toString()}
      <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
      <style data-aphrodite>${css.content}</style>
    </head>
    
    <body>
      <div id="app">${reactDom}</div>
      <script>
        window.REDUX_DATA = ${JSON.stringify(reduxState)}
      </script>
      <script src="${bundleUrl}"></script>
    </body>
    </html>
  `)
})

app.listen(3000, () => console.log('Server started and listening on port 3000'))
