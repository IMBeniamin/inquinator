const express = require('express')
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiCall = require('./routes/API')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv/config');

app.use(bodyParser.json())
app.use('/API',apiCall)
app.use(cors())
app.use(helmet())
app.use(compression())

try {
    mongoose.connect(process.env.DB_CONNESSIONE,() =>{
        console.log(`Connecting successfully with inquinator database`)
    })
} catch (error) {
    console.log({message: error})
}

const port = 80 || process.env.PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})