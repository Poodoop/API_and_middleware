var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var movies = require('./routes/movies.js')
app.use('/movies', movies)

var users = require('./routes/users.js')
app.use('/users', users)

app.listen(3000)