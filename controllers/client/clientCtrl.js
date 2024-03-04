const ClientModel = require("../../models/client/clientModel")

const getClient = async(req,res,next)=>{
    try{
        const client = await ClientModel.find();
        res.data = client
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

const getClientById = async(req,res,next)=>{
    try{
        const client = await ClientModel.findById(req.params.id);
        res.data = client
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

const addClient = async(req,res,next)=>{
    try{
        const client = await ClientModel.create(req.body);
        res.data = client
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

const updateClient = async(req,res,next)=>{
    try{
        const client = await ClientModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = client
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

const deleteClient = async(req,res,next)=>{
    try{
        const client = await ClientModel.findByIdAndDelete(req.params.id);
        res.data = client
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

module.exports = {getClient, getClientById, addClient, updateClient, deleteClient}
