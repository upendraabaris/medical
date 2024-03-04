const SupplierTypeModel = require("../../models/supplier/supplierTypeModel")

const getSupplierType = async(req,res,next)=>{
    try{
        const supplier = await SupplierTypeModel.find();
        res.data = supplier
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

const getSupplierTypeById = async(req,res,next)=>{
    try{
        const supplier = await SupplierTypeModel.findById(req.params.id);
        res.data = supplier
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

const addSupplierType = async(req,res,next)=>{
    try{
        const supplier = await SupplierTypeModel.create(req.body);
        res.data = supplier
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

const updateSupplierType = async(req,res,next)=>{
    try{
        const supplier = await SupplierTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = supplier
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

const deleteSupplierType = async(req,res,next)=>{
    try{
        const supplier = await SupplierTypeModel.findByIdAndDelete(req.params.id);
        res.data = supplier
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

module.exports = {getSupplierType, getSupplierTypeById, addSupplierType, updateSupplierType, deleteSupplierType}
