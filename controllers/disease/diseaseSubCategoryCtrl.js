const DiseaseSubCategoryModel = require("../../models/disease/diseaseSubCategoryModel")

const getDiseaseSubCategory = async(req,res,next)=>{
    try{
        const DiseaseSubCategory = await DiseaseSubCategoryModel.find();
        res.data = DiseaseSubCategory
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

const getDiseaseSubCategoryById = async(req,res,next)=>{
    try{
        const DiseaseSubCategory = await DiseaseSubCategoryModel.findById(req.params.id);
        res.data = DiseaseSubCategory
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

const addDiseaseSubCategory = async(req,res,next)=>{
    try{
        const DiseaseSubCategory = await DiseaseSubCategoryModel.create(req.body);
        res.data = DiseaseSubCategory
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

const updateDiseaseSubCategory = async(req,res,next)=>{
    try{
        const DiseaseSubCategory = await DiseaseSubCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = DiseaseSubCategory
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

const deleteDiseaseSubCategory = async(req,res,next)=>{
    try{
        const DiseaseSubCategory = await DiseaseSubCategoryModel.findByIdAndDelete(req.params.id);
        res.data = DiseaseSubCategory
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

module.exports = {getDiseaseSubCategory, getDiseaseSubCategoryById, addDiseaseSubCategory, updateDiseaseSubCategory, deleteDiseaseSubCategory}
