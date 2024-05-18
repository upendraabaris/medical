const AdmissionTypeModel = require("../models/admissionTypeModel")

const getAdmissionType = async(req,res,next)=>{
    try{
        // let client = await Client.get('AdmissionType');
        // let AdmissionType;
        // if(client == null) {
        //     AdmissionType = await AdmissionTypeModel.find()
        //     await Client.set(`AdmissionType`, JSON.stringify(AdmissionType));
        // }
        // else {
        //     AdmissionType = JSON.parse(client);
        // }
        const AdmissionType = await AdmissionTypeModel.find()
        res.data = AdmissionType
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

const getAdmissionTypeById = async(req,res,next)=>{
    try{
        const AdmissionType = await AdmissionTypeModel.findById(req.params.id);
        res.data = AdmissionType
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

const addAdmissionType = async(req,res,next)=>{
    try{
        const AdmissionType = await AdmissionTypeModel.create(req.body);
        res.data = AdmissionType
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

const updateAdmissionType = async(req,res,next)=>{
    try{
        const AdmissionType = await AdmissionTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = AdmissionType
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

const deleteAdmissionType = async(req,res,next)=>{
    try{
        const AdmissionType = await AdmissionTypeModel.findByIdAndDelete(req.params.id);
        res.data = AdmissionType
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

module.exports = {getAdmissionType, getAdmissionTypeById, addAdmissionType, updateAdmissionType, deleteAdmissionType}
