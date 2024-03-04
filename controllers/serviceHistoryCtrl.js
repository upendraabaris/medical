const ServiceHistoryModel = require("../models/serviceHistoryModel")

const getServiceHistory = async(req,res,next)=>{
    try{
        const ServiceHistory = await ServiceHistoryModel.find();
        res.data = ServiceHistory
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

const getServiceHistoryById = async(req,res,next)=>{
    try{
        const ServiceHistory = await ServiceHistoryModel.findById(req.params.id);
        res.data = ServiceHistory
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

const addServiceHistory = async(req,res,next)=>{
    try{
        console.log(req.body);
        const ServiceHistory = await ServiceHistoryModel.create(req.body);
        res.data = ServiceHistory
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

const updateServiceHistory = async(req,res,next)=>{
    try{
        const ServiceHistory = await ServiceHistoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ServiceHistory
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

const deleteServiceHistory = async(req,res,next)=>{
    try{
        const ServiceHistory = await ServiceHistoryModel.findByIdAndDelete(req.params.id);
        res.data = ServiceHistory
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

module.exports = {getServiceHistory, getServiceHistoryById, addServiceHistory, updateServiceHistory, deleteServiceHistory}
