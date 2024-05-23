const NbsuResponseMappingModel = require("../models/nbsuResponseMappingModel")

const getNbsuResponseMapping = async(req,res,next)=>{
    try{
        // let client = await Client.get('NbsuResponseMapping');
        // let NbsuResponseMapping;
        // if(client == null) {
        //     NbsuResponseMapping = await NbsuResponseMappingModel.find()
        //     await Client.set(`NbsuResponseMapping`, JSON.stringify(NbsuResponseMapping));
        // }
        // else {
        //     NbsuResponseMapping = JSON.parse(client);
        // }
        const NbsuResponseMapping = await NbsuResponseMappingModel.find()
        res.data = NbsuResponseMapping
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

const getNbsuResponseMappingById = async(req,res,next)=>{
    try{
        const NbsuResponseMapping = await NbsuResponseMappingModel.findById(req.params.id);
        res.data = NbsuResponseMapping
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

const addNbsuResponseMapping = async(req,res,next)=>{
    try{
        let addedBy = req.user
        req.body.addedBy = addedBy
        const NbsuResponseMapping = await NbsuResponseMappingModel.create(req.body);
        res.data = NbsuResponseMapping
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

const updateNbsuResponseMapping = async(req,res,next)=>{
    try{
        const NbsuResponseMapping = await NbsuResponseMappingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbsuResponseMapping
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

const deleteNbsuResponseMapping = async(req,res,next)=>{
    try{
        const NbsuResponseMapping = await NbsuResponseMappingModel.findByIdAndDelete(req.params.id);
        res.data = NbsuResponseMapping
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

module.exports = {getNbsuResponseMapping, getNbsuResponseMappingById, addNbsuResponseMapping, updateNbsuResponseMapping, deleteNbsuResponseMapping}
