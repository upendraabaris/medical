const SosModel = require("../../models/sos/sosModel")

const getSos = async(req,res,next)=>{
    try{
        const Sos = await SosModel.find();
        res.data = Sos
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

const getSosById = async(req,res,next)=>{
    try{
        const Sos = await SosModel.findById(req.params.id);
        res.data = Sos
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

const addSos = async(req,res,next)=>{
    try{
        const Sos = await SosModel.create(req.body);
        res.data = Sos
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

const updateSos = async(req,res,next)=>{
    try{
        const Sos = await SosModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Sos
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

const deleteSos = async(req,res,next)=>{
    try{
        const Sos = await SosModel.findByIdAndDelete(req.params.id);
        res.data = Sos
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

module.exports = {getSos, getSosById, addSos, updateSos, deleteSos}
