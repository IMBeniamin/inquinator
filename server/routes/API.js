const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Api = require('../model/apiScheme');
const { query } = require('express');


router.options('*', cors());
/*
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
*/              
router.get("/",(req,res) => {
    
    const createQuery = () => {

        let checkQuery = {
            iso_code: {$in: req.query.iso_code.replace(/\s/g, '').toUpperCase().split(',')},
            year: req.query.year,
            filter: req.query.filter.replace(/\s/g, '').split(',')
        }
        Object.keys(checkQuery).forEach(key => checkQuery[key] === undefined ? delete checkQuery[key] : {})
        
        return checkQuery
    }
    const states = Api.find(checkQuery,filter)
    createQuery()
})

module.exports = router