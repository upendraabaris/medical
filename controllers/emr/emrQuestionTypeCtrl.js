const EmrQuestionTypeModel = require("../../models/emr/emrQuestionTypeModel")

const getEmrQuestionType = async(req,res,next)=>{
    try{
        const EmrQuestionType = await EmrQuestionTypeModel.find();
        res.data = EmrQuestionType
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

const getEmrQuestionTypeById = async(req,res,next)=>{
    try{
        const EmrQuestionType = await EmrQuestionTypeModel.findById(req.params.id);
        res.data = EmrQuestionType
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

const addEmrQuestionType = async(req,res,next)=>{
    try{
        const EmrQuestionType = await EmrQuestionTypeModel.create(req.body);
        res.data = EmrQuestionType
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

const updateEmrQuestionType = async(req,res,next)=>{
    try{
        const EmrQuestionType = await EmrQuestionTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = EmrQuestionType
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

const deleteEmrQuestionType = async(req,res,next)=>{
    try{
        const EmrQuestionType = await EmrQuestionTypeModel.findByIdAndDelete(req.params.id);
        res.data = EmrQuestionType
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

module.exports = {getEmrQuestionType, getEmrQuestionTypeById, addEmrQuestionType, updateEmrQuestionType, deleteEmrQuestionType}
