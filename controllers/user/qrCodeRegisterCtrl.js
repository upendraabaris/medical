const QrCodeRegisterModel = require("../../models/user/qrCodeRegisterModel")

const getQrCodeRegister = async(req,res,next)=>{
    try{
        const user = await QrCodeRegisterModel.find();
        res.data = user
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

const getQrCodeRegisterById = async(req,res,next)=>{
    try{
        const user = await QrCodeRegisterModel.findById(req.params.id);
        res.data = user
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

const addQrCodeRegister = async(req,res,next)=>{
    try{
        const user = await QrCodeRegisterModel.create(req.body);
        res.data = user
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

const updateQrCodeRegister = async(req,res,next)=>{
    try{
        const user = await QrCodeRegisterModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = user
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

const deleteQrCodeRegister = async(req,res,next)=>{
    try{
        const user = await QrCodeRegisterModel.findByIdAndDelete(req.params.id);
        res.data = user
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

module.exports = {getQrCodeRegister, getQrCodeRegisterById, addQrCodeRegister, updateQrCodeRegister, deleteQrCodeRegister}
