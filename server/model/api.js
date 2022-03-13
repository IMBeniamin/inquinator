const mongoose = require('mongoose')

const schema = mongoose.Schema({
    country : String,
    year: String,
    iso_code: String,
    country: String,
    year: String,
    co2: String,
    co2_per_capita: String,
    trade_co2: String,
    cement_co2: String,
    cement_co2_per_capita: String,
    coal_co2: String,
    coal_co2_per_capita: String,
    flaring_co2: String,
    flaring_co2_per_capita: String,
    gas_co2: String,
    gas_co2_per_capita: String,
    oil_co2: String,
    oil_co2_per_capita: String,
    other_industry_co2: String,
    other_co2_per_capita: String,
    co2_growth_prct: String,
    co2_growth_abs: String,
    co2_per_gdp: String,
    co2_per_unit_energy: String,
    consumption_co2: String,
    consumption_co2_per_capita: String,
    consumption_co2_per_gdp: String,
    cumulative_co2: String,
    cumulative_cement_co2: String,
    cumulative_coal_co2: String,
    cumulative_flaring_co2: String,
    cumulative_gas_co2: String,
    cumulative_oil_co2: String,
    cumulative_other_co2: String,
    trade_co2_share: String,
    share_global_co2: String,
    share_global_cement_co2: String,
    share_global_coal_co2: String,
    share_global_flaring_co2: String,
    share_global_gas_co2: String,
    share_global_oil_co2: String,
    share_global_other_co2: String,
    share_global_cumulative_co2: String,
    share_global_cumulative_cement_co2: String,
    share_global_cumulative_coal_co2: String,
    share_global_cumulative_flaring_co2: String,
    share_global_cumulative_gas_co2: String,
    share_global_cumulative_oil_co2: String,
    share_global_cumulative_other_co2: String,
    total_ghg: String,
    ghg_per_capita: String,
    total_ghg_excluding_lucf: String,
    ghg_excluding_lucf_per_capita: String,
    methane: String,
    methane_per_capita: String,
    nitrous_oxide: String,
    nitrous_oxide_per_capita: String,
    population: String,
    gdp: String,
    primary_energy_consumption: String,
    energy_per_capita: String,
    energy_per_gdp: String
})

module.exports = mongoose.model('inquinators',schema)



