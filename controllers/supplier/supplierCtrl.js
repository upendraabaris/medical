const SupplierModel = require("../../models/supplier/supplierModel")

const getSupplier = async(req,res,next)=>{
    try{
        const supplier = await SupplierModel.find().populate('supplier_type_id').exec();
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

const getSupplierById = async(req,res,next)=>{
    try{
        const supplier = await SupplierModel.findById(req.params.id).populate('supplier_type_id').exec();
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

const addSupplier = async(req,res,next)=>{
    try{
        const supplier = await SupplierModel.create(req.body);
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

const updateSupplier = async(req,res,next)=>{
    try{
        const supplier = await SupplierModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
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

const deleteSupplier = async(req,res,next)=>{
    try{
        const supplier = await SupplierModel.findByIdAndDelete(req.params.id);
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

module.exports = {getSupplier, getSupplierById, addSupplier, updateSupplier, deleteSupplier}
