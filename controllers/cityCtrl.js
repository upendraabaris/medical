const CityModel = require("../models/CityModel")

const getCity = async(req,res,next)=>{
    try{
        const City = await CityModel.find().populate('state_id').exec();
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

module.exports = {getCity, getCityById, addCity, updateCity, deleteCity}