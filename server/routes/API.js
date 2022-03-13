const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Api = require('../model/api');


router.options('*', cors());
router.get('/:year', (req,res) => {
    const states = Api.find({year:req.params.year}, (error,country) => {

            if(error){
                res.send(error)
            }
            console.log(country)
            res.json(country)
        }
    )
})

module.exports = router