const DiseaseCategoryModel = require("../../models/disease/diseaseCategoryModel")

const getDiseaseCategory = async(req,res,next)=>{
    try{
        const DiseaseCategory = await DiseaseCategoryModel.find();
        res.data = DiseaseCategory
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

const getDiseaseCategoryById = async(req,res,next)=>{
    try{
        const DiseaseCategory = await DiseaseCategoryModel.findById(req.params.id);
        res.data = DiseaseCategory
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

const addDiseaseCategory = async(req,res,next)=>{
    try{
        const DiseaseCategory = await DiseaseCategoryModel.create(req.body);
        res.data = DiseaseCategory
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

const updateDiseaseCategory = async(req,res,next)=>{
    try{
        const DiseaseCategory = await DiseaseCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = DiseaseCategory
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

const deleteDiseaseCategory = async(req,res,next)=>{
    try{
        const DiseaseCategory = await DiseaseCategoryModel.findByIdAndDelete(req.params.id);
        res.data = DiseaseCategory
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

module.exports = {getDiseaseCategory, getDiseaseCategoryById, addDiseaseCategory, updateDiseaseCategory, deleteDiseaseCategory}
