const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ErrorHandling = require('./helper/error_handling')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const options = {
  swaggerOptions: {
    // plugins: [
    //      DisableTryItOutPlugin
    // ],
    supportedSubmitMethods: ['get', 'put', 'post', 'delete']
  }
}
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// documents
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
// add api route here
app.use('/', require('./route/index'))
app.use(ErrorHandling)
module.exports = app
