const CityModel = require("../models/cityModel")
const Client = require("../middleware/redis")
const getCity = async(req,res,next)=>{
    try{
        // const City = await CityModel.find().populate('state_id').exec();
        let client = await Client.get('city:getCity');
        let City;
        if(client == null) {
            City = await CityModel.find().populate('state_id').exec();
            await Client.set('city:getCity', JSON.stringify(City));
        }
        else {
            City = JSON.parse(client);
        }
        res.data = City
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

const getCityById = async(req,res,next)=>{
    try{
        const City = await CityModel.findById(req.params.id).populate('state_id').exec();
        res.data = City
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

const addCity = async(req,res,next)=>{
    try{
        const City = await CityModel.create(req.body);
        let allKeys = await Client.keys("city:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = City
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

const updateCity = async(req,res,next)=>{
    try{
        const City = await CityModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        let allKeys = await Client.keys("city:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = City
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

const deleteCity = async(req,res,next)=>{
    try{
        const City = await CityModel.findByIdAndDelete(req.params.id);
        let allKeys = await Client.keys("city:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = City
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

const deleteAllCity = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteCity = await CityModel.deleteMany({_id: { $in: idToDelete}});
        let allKeys = await Client.keys("city:*");
        if (allKeys.length != 0) {
            const del = await Client.del(allKeys);
        }
        res.data = deleteCity;
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
module.exports = {getCity, getCityById, addCity, updateCity, deleteCity, deleteAllCity}