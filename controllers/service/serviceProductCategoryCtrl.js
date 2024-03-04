const ServiceProductCategoryModel = require("../../models/service/serviceProductCategoryModel")

const getServiceProductCategory = async(req,res,next)=>{
    try{
        const ServiceProductCategory = await ServiceProductCategoryModel.find();
        res.data = ServiceProductCategory
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

const getServiceProductCategoryById = async(req,res,next)=>{
    try{
        const ServiceProductCategory = await ServiceProductCategoryModel.findById(req.params.id);
        res.data = ServiceProductCategory
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

const addServiceProductCategory = async(req,res,next)=>{
    try{
        const ServiceProductCategory = await ServiceProductCategoryModel.create(req.body);
        res.data = ServiceProductCategory
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

const updateServiceProductCategory = async(req,res,next)=>{
    try{
        const ServiceProductCategory = await ServiceProductCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ServiceProductCategory
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

const deleteServiceProductCategory = async(req,res,next)=>{
    try{
        const ServiceProductCategory = await ServiceProductCategoryModel.findByIdAndDelete(req.params.id);
        res.data = ServiceProductCategory
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

module.exports = {getServiceProductCategory, getServiceProductCategoryById, addServiceProductCategory, updateServiceProductCategory, deleteServiceProductCategory}
