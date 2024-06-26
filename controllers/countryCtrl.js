const CountryModel = require("../models/countryModel")
const Client = require("../middleware/redis")
const getCountry = async(req,res,next)=>{
    try{
        let client = await Client.get('country:getCountry');
        let Country;
        if(client == null) {
            Country = await CountryModel.find().populate('regionid').sort({ country_name: 1 });
            await Client.set('country:getCountry', JSON.stringify(Country));
        }
        else {
            Country = JSON.parse(client);
        }

        // const Country = await CountryModel.find();
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

const getCountryByRegionId = async (req, res, next) => {
    try {
        const { region_id } = req.params;

        let clientKey = `country:getCountry`;
        if (region_id) {
            clientKey += `:${region_id}`;
        }
        
        let client = await Client.get(clientKey);
        let countries;

        if (client == null) {
            if (region_id) {
                countries = await CountryModel.find({ regionid: region_id }).populate('regionid').sort({ country_name: 1 });
            } else {
                countries = await CountryModel.find().populate('regionid').sort({ country_name: 1 });
            }
            await Client.set(clientKey, JSON.stringify(countries));
        } else {
            countries = JSON.parse(client);
        }

        res.data = countries;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
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
        let allKeys = await Client.keys("country:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
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
        let allKeys = await Client.keys("country:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
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
        let allKeys = await Client.keys("country:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
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

const deleteAllCountry = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteCountry = await CountryModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteCountry;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
    }
}

module.exports = {getCountry, getCountryById, addCountry, updateCountry, deleteCountry, deleteAllCountry, getCountryByRegionId}