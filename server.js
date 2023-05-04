const express = require('express')
const app = express()
const router = require('./server/routes/router')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const db = require('./server/database/connection')
dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 6969;

// log reqs
app.use(morgan('tiny'))
db();
// parse req to body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// set view engine

app.set('view engine', 'ejs')
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

app.use('/', router)
app.listen(PORT, () => {
    console.log("Started on " + PORT + "...")
})