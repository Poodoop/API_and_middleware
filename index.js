var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var swaggerJsdoc = require('swagger-jsdoc')
var swaggerUi = require('swagger-ui-express')
var path = require('path')

var app = express()

app.use(morgan('common'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie Database API with Swagger',
            version: '0.1.0',
            description:
                'Simple CRUD API for movies and user register/login with Express, documented with Swagger.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

var movies = require('./routes/movies.js')
app.use('/movies', movies)

var users = require('./routes/users.js')
app.use('/users', users)

app.use('/images', express.static(path.join(__dirname, 'upload')))

app.listen(3000)