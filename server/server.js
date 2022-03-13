const express = require('express')
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiCall = require('./routes/API')
const cors = require('cors')
require('dotenv/config');

app.use(bodyParser.json())
app.use('/API',apiCall)
app.use(cors())

try {
    mongoose.connect(process.env.DB_CONNESSIONE,() =>{
        console.log(`Connecting successfully with inquinator database`)
    })
} catch (error) {
    console.log({message: error})
}

const port = 82 || process.env.PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})