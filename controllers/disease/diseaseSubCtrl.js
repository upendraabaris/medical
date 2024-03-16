const DiseaseSubModel = require("../../models/disease/diseaseSubModel")

const getDiseaseSub = async(req,res,next)=>{
    try{
        const DiseaseSub = await DiseaseSubModel.find();
        res.data = DiseaseSub
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

const getDiseaseSubById = async(req,res,next)=>{
    try{
        const DiseaseSub = await DiseaseSubModel.findById(req.params.id);
        res.data = DiseaseSub
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

const addDiseaseSub = async(req,res,next)=>{
    try{
        const DiseaseSub = await DiseaseSubModel.create(req.body);
        res.data = DiseaseSub
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

const updateDiseaseSub = async(req,res,next)=>{
    try{
        const DiseaseSub = await DiseaseSubModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = DiseaseSub
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

const deleteDiseaseSub = async(req,res,next)=>{
    try{
        const DiseaseSub = await DiseaseSubModel.findByIdAndDelete(req.params.id);
        res.data = DiseaseSub
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

module.exports = {getDiseaseSub, getDiseaseSubById, addDiseaseSub, updateDiseaseSub, deleteDiseaseSub}
