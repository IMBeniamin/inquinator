const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Api = require('../model/api');
const { query } = require('express');


router.options('*', cors());
router.get('/', (req,res) => {
    const states = Api.find({year: req.query.year, co2:{$ne: null}, iso_code: {$ne: null}},"-_id iso_code co2", (error,country) => {
            if(error){
                res.send(error)
            }
            console.log(country)
            res.json(country)
        }
    )
})

module.exports = router