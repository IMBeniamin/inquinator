const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const Api = require("../model/apiScheme");
const { query } = require("express");

router.options("*", cors());
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

router.get("/", (req, res) => {
  const sort = req.query.sort || {
    year: "desc",
  };

  // filter FORMATTING
  const filter_format = new RegExp("^(-?)\\w+(?:(,?)(?:\\1\\w+)){0,}$");
  let filter = req.query.filter
    ? req.query.filter.replace(/\s/g, "")
    : undefined;
  // console.log("raw filter is:", filter)
  if (filter && filter_format.test(filter)) {
    filter = filter.split(",");
  } else {
    filter = {};
    // TODO error handling code for misformatted filter
  }

  // iso_code FORMATTING
  const iso_code_format = new RegExp("^\\w{3}(?:,\\w{3}){0,}$");
  let iso_code = req.query.iso_code
    ? req.query.iso_code.replace(/\s/g, "").toUpperCase()
    : undefined;
  // console.log("raw iso_code is:", iso_code)
  if (iso_code && iso_code_format.test(req.query.iso_code)) {
    iso_code = iso_code.split(",");
    // console.log("formatted iso code is: ", iso_code)
  } else {
    iso_code = undefined;
    // TODO error handling code for misformatted iso_code
  }

  // year FORMATTING
  const year_format_list = new RegExp("^-?\\d+(?:,-?\\d+){0,}$");
  const year_format_range = new RegExp("^(-?\\d+)-(-?\\d+)$");
  let year_type_range = false;
  let year = req.query.year;
  let year_from = undefined;
  let year_to = undefined;
  // console.log("raw year is:", year)
  if (year && year_format_list.test(year)) {
    year = year.split(",");
    // console.log("formatted list year is:", year)
  } else if (year_format_range.test(year)) {
    let range = year_format_range.exec(year).slice(1);
    year_from = Math.min(...range);
    year_to = Math.max(...range);
    year_type_range = true;
    // console.log("formatted range year is:", year_from, year_to)
  } else {
    year = undefined;
    // TODO error handling code for misformatted year
  }

  // Initiating query build
  let formatted_query = {
    iso_code: iso_code
      ? {
          $in: iso_code,
        }
      : undefined,
    year: year
      ? year_type_range
        ? {
            $gt: year_from,
            $lt: year_to,
          }
        : {
            $in: year,
          }
      : undefined,
  };
  Object.keys(formatted_query).forEach((key) =>
    formatted_query[key] === undefined ? delete formatted_query[key] : {}
  );
  console.log(formatted_query, filter);

  Api.find(formatted_query, filter)
    .sort(sort)
    .exec((error, country) => {
      if (error) {
        res.send(error);
      }
      res.json(country);
    });
});

module.exports = router;
