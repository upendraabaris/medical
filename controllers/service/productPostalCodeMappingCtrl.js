const ProductPostalCodeMappingModel = require("../../models/service/productPostalCodeMapping")

const getProductPostalCodeMapping = async(req,res,next)=>{
    try{
        const ProductPostalCodeMapping = await ProductPostalCodeMappingModel.find();
        res.data = ProductPostalCodeMapping
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

const getProductPostalCodeMappingById = async(req,res,next)=>{
    try{
        const ProductPostalCodeMapping = await ProductPostalCodeMappingModel.findById(req.params.id);
        res.data = ProductPostalCodeMapping
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

const addProductPostalCodeMapping = async(req,res,next)=>{
    try{
        const ProductPostalCodeMapping = await ProductPostalCodeMappingModel.create(req.body);
        res.data = ProductPostalCodeMapping
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

const updateProductPostalCodeMapping = async(req,res,next)=>{
    try{
        const ProductPostalCodeMapping = await ProductPostalCodeMappingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ProductPostalCodeMapping
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

const deleteProductPostalCodeMapping = async(req,res,next)=>{
    try{
        const ProductPostalCodeMapping = await ProductPostalCodeMappingModel.findByIdAndDelete(req.params.id);
        res.data = ProductPostalCodeMapping
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

module.exports = {getProductPostalCodeMapping, getProductPostalCodeMappingById, addProductPostalCodeMapping, updateProductPostalCodeMapping, deleteProductPostalCodeMapping}
