var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var app = express()

app.use(morgan('common'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var movies = require('./routes/movies.js')
app.use('/movies', movies)

var users = require('./routes/users.js')
app.use('/users', users)

app.listen(3000)