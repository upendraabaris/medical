const SosTransactionModel = require("../../models/sos/sosTransactionModel")

const getSosTransaction = async(req,res,next)=>{
    try{
        const SosTransaction = await SosTransactionModel.find();
        res.data = SosTransaction
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

const getSosTransactionById = async(req,res,next)=>{
    try{
        const SosTransaction = await SosTransactionModel.findById(req.params.id);
        res.data = SosTransaction
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

const addSosTransaction = async(req,res,next)=>{
    try{
        const SosTransaction = await SosTransactionModel.create(req.body);
        res.data = SosTransaction
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

const updateSosTransaction = async(req,res,next)=>{
    try{
        const SosTransaction = await SosTransactionModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SosTransaction
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

const deleteSosTransaction = async(req,res,next)=>{
    try{
        const SosTransaction = await SosTransactionModel.findByIdAndDelete(req.params.id);
        res.data = SosTransaction
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

module.exports = {getSosTransaction, getSosTransactionById, addSosTransaction, updateSosTransaction, deleteSosTransaction}
