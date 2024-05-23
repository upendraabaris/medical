const NbsuResponseModel = require("../models/nbsuResponseModel")

const getNbsuResponse = async(req,res,next)=>{
    try{
        // let client = await Client.get('NbsuResponse');
        // let NbsuResponse;
        // if(client == null) {
        //     NbsuResponse = await NbsuResponseModel.find()
        //     await Client.set(`NbsuResponse`, JSON.stringify(NbsuResponse));
        // }
        // else {
        //     NbsuResponse = JSON.parse(client);
        // }
        const NbsuResponse = await NbsuResponseModel.find()
        res.data = NbsuResponse
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

const getNbsuResponseById = async(req,res,next)=>{
    try{
        const NbsuResponse = await NbsuResponseModel.findById(req.params.id);
        res.data = NbsuResponse
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

const addNbsuResponse = async(req,res,next)=>{
    try{
        const NbsuResponse = await NbsuResponseModel.create(req.body);
        res.data = NbsuResponse
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

const updateNbsuResponse = async(req,res,next)=>{
    try{
        const NbsuResponse = await NbsuResponseModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbsuResponse
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

const deleteNbsuResponse = async(req,res,next)=>{
    try{
        const NbsuResponse = await NbsuResponseModel.findByIdAndDelete(req.params.id);
        res.data = NbsuResponse
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

module.exports = {getNbsuResponse, getNbsuResponseById, addNbsuResponse, updateNbsuResponse, deleteNbsuResponse}
