const EngagementTypeModel = require("../models/engagementTypeModel")

const getEngagementType = async(req,res,next)=>{
    try{
        // let client = await Client.get('EngagementType');
        // let EngagementType;
        // if(client == null) {
        //     EngagementType = await EngagementTypeModel.find()
        //     await Client.set(`EngagementType`, JSON.stringify(EngagementType));
        // }
        // else {
        //     EngagementType = JSON.parse(client);
        // }
        const EngagementType = await EngagementTypeModel.find()
        res.data = EngagementType
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

const getEngagementTypeById = async(req,res,next)=>{
    try{
        const EngagementType = await EngagementTypeModel.findById(req.params.id);
        res.data = EngagementType
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

const addEngagementType = async(req,res,next)=>{
    try{
        const EngagementType = await EngagementTypeModel.create(req.body);
        res.data = EngagementType
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

const updateEngagementType = async(req,res,next)=>{
    try{
        const EngagementType = await EngagementTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = EngagementType
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

const deleteEngagementType = async(req,res,next)=>{
    try{
        const EngagementType = await EngagementTypeModel.findByIdAndDelete(req.params.id);
        res.data = EngagementType
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

module.exports = {getEngagementType, getEngagementTypeById, addEngagementType, updateEngagementType, deleteEngagementType}
