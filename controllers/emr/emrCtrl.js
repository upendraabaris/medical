const EmrModel = require("../../models/emr/emrModel")

const getEmr = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.find();
        res.data = Emr
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

const getEmrById = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.findById(req.params.id);
        res.data = Emr
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

const addEmr = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.create(req.body);
        res.data = Emr
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

const updateEmr = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Emr
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

const deleteEmr = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.findByIdAndDelete(req.params.id);
        res.data = Emr
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

module.exports = {getEmr, getEmrById, addEmr, updateEmr, deleteEmr}
