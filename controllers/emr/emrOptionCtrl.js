const EmrOptionModel = require("../../models/emr/emrOptionModel")

const getEmrOption = async(req,res,next)=>{
    try{
        const EmrOption = await EmrOptionModel.find();
        res.data = EmrOption
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

const getEmrOptionById = async(req,res,next)=>{
    try{
        const EmrOption = await EmrOptionModel.findById(req.params.id);
        res.data = EmrOption
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

const addEmrOption = async(req,res,next)=>{
    try{
        const EmrOption = await EmrOptionModel.create(req.body);
        res.data = EmrOption
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

const updateEmrOption = async(req,res,next)=>{
    try{
        const EmrOption = await EmrOptionModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = EmrOption
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

const deleteEmrOption = async(req,res,next)=>{
    try{
        const EmrOption = await EmrOptionModel.findByIdAndDelete(req.params.id);
        res.data = EmrOption
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

module.exports = {getEmrOption, getEmrOptionById, addEmrOption, updateEmrOption, deleteEmrOption}
