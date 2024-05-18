const SosContactModel = require("../../models/sos/sosContactModel")

const getSosContact = async(req,res,next)=>{
    try{
        const SosContact = await SosContactModel.find();
        res.data = SosContact
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

const getSosContactById = async(req,res,next)=>{
    try{
        const SosContact = await SosContactModel.findById(req.params.id);
        res.data = SosContact
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

const addSosContact = async(req,res,next)=>{
    try{
        const SosContact = await SosContactModel.create(req.body);
        res.data = SosContact
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

const updateSosContact = async(req,res,next)=>{
    try{
        const SosContact = await SosContactModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SosContact
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

const deleteSosContact = async(req,res,next)=>{
    try{
        const SosContact = await SosContactModel.findByIdAndDelete(req.params.id);
        res.data = SosContact
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

module.exports = {getSosContact, getSosContactById, addSosContact, updateSosContact, deleteSosContact}
