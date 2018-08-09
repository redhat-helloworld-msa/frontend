/**
 * JBoss, Home of Professional Open Source
 * Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var express = require('express')
var mustacheExpress = require('mustache-express')
var app = express()

// Register '.html' extension with The Mustache Express
app.engine('html', mustacheExpress())
app.engine('json', mustacheExpress())

app.set('view engine', 'mustache')
app.set('views', __dirname)

// Return a custom index.html file
var customIndex = function (req, res) {
  var view = {
    hystrix: process.env.ENABLE_HYSTRIX ? JSON.parse(process.env.ENABLE_HYSTRIX): null,
    jaeger: process.env.ENABLE_JAEGER ? JSON.parse(process.env.ENABLE_JAEGER) : null,
    sso: process.env.ENABLE_SSO ? JSON.parse(process.env.ENABLE_SSO) : null,
    threescale: process.env.ENABLE_THREESCALE ? JSON.parse(process.env.ENABLE_THREESCALE) : null
  }
  res.render('index.html', view)
}

app.get('/', customIndex)
app.get('/index.html', customIndex)

// Return a custom keycloak.json file
app.get('/keycloak.json', function (req, res) {
  var view = {
    keycloak_server: process.env.KEYCLOAK_AUTH_SERVER_URL
  }
  res.render('keycloak.json', view)
})

// Serve all static files
app.use('/', express.static('.'))

var server = app.listen(8080, '0.0.0.0', function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Frontend service running at http://%s:%s', host, port)
})
