const CityModel = require("../models/cityModel")

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

const deleteAllCity = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteCity = await CityModel.deleteMany({_id: { $in: idToDelete}});
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

const getCityMapping = async(req,res,next)=>{
    try{
        // const City = await CityModel.find().populate('state_id').exec();
        const City = await CityModel.aggregate([
            {
                $lookup:{
                    from: "cities",
                    localField: "city_name",
                    foreignField: "city_name",
                    as: "cityinfo"
                }
            },
            {
                    $unwind:"$cityinfo"
            },
            {
                $project:{
                    _id:0,
                    "city_name": "$cityinfo.city_name"
                }
            }
        ]);
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

module.exports = {getCity, getCityById, addCity, updateCity, deleteCity, getCityMapping, deleteAllCity}