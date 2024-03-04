const ServiceModel = require("../../models/service/serviceModel")

const getService = async(req,res,next)=>{
    try{
        const Service = await ServiceModel.find();
        res.data = Service
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

const getServiceById = async(req,res,next)=>{
    try{
        const Service = await ServiceModel.findById(req.params.id);
        res.data = Service
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

const addService = async(req,res,next)=>{
    try{
        const Service = await ServiceModel.create(req.body);
        res.data = Service
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

const updateService = async(req,res,next)=>{
    try{
        const Service = await ServiceModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Service
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

const deleteService = async(req,res,next)=>{
    try{
        const Service = await ServiceModel.findByIdAndDelete(req.params.id);
        res.data = Service
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

module.exports = {getService, getServiceById, addService, updateService, deleteService}
