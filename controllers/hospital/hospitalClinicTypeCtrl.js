const HospitalClinicTypeModel = require("../../models/hospital/hospitalClinicTypeModel")

const getHospitalClinicType = async(req,res,next)=>{
    try{
        const HospitalClinicType = await HospitalClinicTypeModel.find();
        res.data = HospitalClinicType
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

const getHospitalClinicTypeById = async(req,res,next)=>{
    try{
        const HospitalClinicType = await HospitalClinicTypeModel.findById(req.params.id);
        res.data = HospitalClinicType
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

const addHospitalClinicType = async(req,res,next)=>{
    try{
        console.log(req.body);
        const HospitalClinicType = await HospitalClinicTypeModel.create(req.body);
        res.data = HospitalClinicType
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

const updateHospitalClinicType = async(req,res,next)=>{
    try{
        const HospitalClinicType = await HospitalClinicTypeModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = HospitalClinicType
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

const deleteHospitalClinicType = async(req,res,next)=>{
    try{
        const HospitalClinicType = await HospitalClinicTypeModel.findByIdAndDelete(req.params.id);
        res.data = HospitalClinicType
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

module.exports = {getHospitalClinicType, getHospitalClinicTypeById, addHospitalClinicType, updateHospitalClinicType, deleteHospitalClinicType}
