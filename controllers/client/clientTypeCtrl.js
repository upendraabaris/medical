const ClientTypeModel = require("../../models/client/clientTypeModel")

const getClientType = async(req,res,next)=>{
    try{
        const ClientType = await ClientTypeModel.find();
        res.data = ClientType
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

const getClientTypeById = async(req,res,next)=>{
    try{
        const ClientType = await ClientTypeModel.findById(req.params.id);
        res.data = ClientType
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

const addClientType = async(req,res,next)=>{
    try{
        const ClientType = await ClientTypeModel.create(req.body);
        res.data = ClientType
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

const updateClientType = async(req,res,next)=>{
    try{
        const ClientType = await ClientTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ClientType
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

const deleteClientType = async(req,res,next)=>{
    try{
        const ClientType = await ClientTypeModel.findByIdAndDelete(req.params.id);
        res.data = ClientType
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

module.exports = {getClientType, getClientTypeById, addClientType, updateClientType, deleteClientType}
