const ZoneModel = require("../models/zoneModel")
const Client = require("../middleware/redis")
const getZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.find().populate('cities').exec();
        res.data = Zone
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

const getZoneById = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findById(req.params.id).populate('cities').exec();
        res.data = Zone
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

const addZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.create(req.body);
        res.data = Zone
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

const updateZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Zone
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

const deleteZone = async(req,res,next)=>{
    try{
        const Zone = await ZoneModel.findByIdAndDelete(req.params.id);
        res.data = Zone
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

module.exports = {getZone, getZoneById, addZone, updateZone, deleteZone}