const ProductCategoryModel = require("../../models/service/ProductCategoryModel")

const getProductCategory = async(req,res,next)=>{
    try{
        const ProductCategory = await ProductCategoryModel.find();
        res.data = ProductCategory
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

const getProductCategoryById = async(req,res,next)=>{
    try{
        const ProductCategory = await ProductCategoryModel.findById(req.params.id);
        res.data = ProductCategory
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

const addProductCategory = async(req,res,next)=>{
    try{
        const ProductCategory = await ProductCategoryModel.create(req.body);
        res.data = ProductCategory
        res.status_Code = "200"
        res.message = 'Product category added successfully'
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const updateProductCategory = async(req,res,next)=>{
    try{
        const ProductCategory = await ProductCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ProductCategory
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

const deleteProductCategory = async(req,res,next)=>{
    try{
        const ProductCategory = await ProductCategoryModel.findByIdAndDelete(req.params.id);
        res.data = ProductCategory
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

module.exports = {getProductCategory, getProductCategoryById, addProductCategory, updateProductCategory, deleteProductCategory}
