const ProductSupplierMappingModel = require("../../models/service/productSupplierMappingModel")

const getProductSupplierMapping = async(req,res,next)=>{
    try{
        const ProductSupplierMapping = await ProductSupplierMappingModel.find();
        res.data = ProductSupplierMapping
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

const getProductSupplierMappingById = async(req,res,next)=>{
    try{
        const ProductSupplierMapping = await ProductSupplierMappingModel.findById(req.params.id);
        res.data = ProductSupplierMapping
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

const addProductSupplierMapping = async(req,res,next)=>{
    try{
        const ProductSupplierMapping = await ProductSupplierMappingModel.create(req.body);
        res.data = ProductSupplierMapping
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

const updateProductSupplierMapping = async(req,res,next)=>{
    try{
        const ProductSupplierMapping = await ProductSupplierMappingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ProductSupplierMapping
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

const deleteProductSupplierMapping = async(req,res,next)=>{
    try{
        const ProductSupplierMapping = await ProductSupplierMappingModel.findByIdAndDelete(req.params.id);
        res.data = ProductSupplierMapping
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

module.exports = {getProductSupplierMapping, getProductSupplierMappingById, addProductSupplierMapping, updateProductSupplierMapping, deleteProductSupplierMapping}
