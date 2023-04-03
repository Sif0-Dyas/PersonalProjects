//import express and store express in a variable
const express = require("express")
const cors = require('cors')

//initialize the express application and store it in a variable called 'app'
const app = express()

//intialize the port to 8000
const port = 8000
const Routes = require('./routes/notes.routes')

//allow the application to parse json data (form information)
//allow the application to accept form information
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

require('./config/mongoose.config')

Routes(app)

//let's you know what port you are using
app.listen(port, () => console.log(`You are now connected to outer space... port: ${port}`))

