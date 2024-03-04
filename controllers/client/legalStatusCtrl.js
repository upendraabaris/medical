const LegalStatusModel = require("../../models/client/legalStatusModel")

const getLegalStatus = async(req,res,next)=>{
    try{
        const LegalStatus = await LegalStatusModel.find();
        res.data = LegalStatus
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

const getLegalStatusById = async(req,res,next)=>{
    try{
        const LegalStatus = await LegalStatusModel.findById(req.params.id);
        res.data = LegalStatus
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

const addLegalStatus = async(req,res,next)=>{
    try{
        const LegalStatus = await LegalStatusModel.create(req.body);
        res.data = LegalStatus
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

const updateLegalStatus = async(req,res,next)=>{
    try{
        const LegalStatus = await LegalStatusModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = LegalStatus
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

const deleteLegalStatus = async(req,res,next)=>{
    try{
        const LegalStatus = await LegalStatusModel.findByIdAndDelete(req.params.id);
        res.data = LegalStatus
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

module.exports = {getLegalStatus, getLegalStatusById, addLegalStatus, updateLegalStatus, deleteLegalStatus}
