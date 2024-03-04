const SosApplicationFormModel = require("../../models/sos/sosApplicationFormModel")

const getSosApplicationForm = async(req,res,next)=>{
    try{
        const SosApplicationForm = await SosApplicationFormModel.find();
        res.data = SosApplicationForm
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

const getSosApplicationFormById = async(req,res,next)=>{
    try{
        const SosApplicationForm = await SosApplicationFormModel.findById(req.params.id);
        res.data = SosApplicationForm
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

const addSosApplicationForm = async(req,res,next)=>{
    try{
        const SosApplicationForm = await SosApplicationFormModel.create(req.body);
        res.data = SosApplicationForm
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

const updateSosApplicationForm = async(req,res,next)=>{
    try{
        const SosApplicationForm = await SosApplicationFormModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SosApplicationForm
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

const deleteSosApplicationForm = async(req,res,next)=>{
    try{
        const SosApplicationForm = await SosApplicationFormModel.findByIdAndDelete(req.params.id);
        res.data = SosApplicationForm
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

module.exports = {getSosApplicationForm, getSosApplicationFormById, addSosApplicationForm, updateSosApplicationForm, deleteSosApplicationForm}
