const EmrResponseModel = require("../../models/emr/emrResponseModel")

const getEmrResponse = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.find();
        res.data = EmrResponse
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

const getEmrResponseById = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.findById(req.params.id);
        res.data = EmrResponse
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

const addEmrResponse = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.create(req.body);
        res.data = EmrResponse
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

const updateEmrResponse = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = EmrResponse
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

const deleteEmrResponse = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.findByIdAndDelete(req.params.id);
        res.data = EmrResponse
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

module.exports = {getEmrResponse, getEmrResponseById, addEmrResponse, updateEmrResponse, deleteEmrResponse}
