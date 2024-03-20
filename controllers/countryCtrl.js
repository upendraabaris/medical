const CountryModel = require("../models/countryModel")
const Client = require("../middleware/redis")
const getCountry = async(req,res,next)=>{
    try{
        let client = await Client.get(`country:CountryList`);
        let country;
        if(client == null) {
            country = await CountryModel.find();
            await Client.set(`country:CountryList`, JSON.stringify(country));
        }
        else {
            country = JSON.parse(client);
        }

        // const Country = await CountryModel.find();
        res.data = country
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const getCountryById = async(req,res,next)=>{
    try{
        const Country = await CountryModel.findById(req.params.id);
        res.data = Country
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const addCountry = async(req,res,next)=>{
    try{
        const Country = await CountryModel.create(req.body);
        res.data = Country
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const updateCountry = async(req,res,next)=>{
    try{
        const Country = await CountryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Country
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deleteCountry = async(req,res,next)=>{
    try{
        const Country = await CountryModel.findByIdAndDelete(req.params.id);
        res.data = Country
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

module.exports = {getCountry, getCountryById, addCountry, updateCountry, deleteCountry}