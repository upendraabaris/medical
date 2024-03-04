const HospitalClinicModel = require("../../models/hospital/hospitalClinicModel")

const getHospitalClinic = async(req,res,next)=>{
    try{
        const HospitalClinic = await HospitalClinicModel.find().populate('hos_clinic_type_id');
        res.data = HospitalClinic
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

const getHospitalClinicById = async(req,res,next)=>{
    try{
        const HospitalClinic = await HospitalClinicModel.findById(req.params.id).populate('hos_clinic_type_id');
        res.data = HospitalClinic
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

const addHospitalClinic = async(req,res,next)=>{
    try{
        console.log(req.body);
        const HospitalClinic = await HospitalClinicModel.create(req.body);
        res.data = HospitalClinic
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

const updateHospitalClinic = async(req,res,next)=>{
    try{
        const HospitalClinic = await HospitalClinicModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = HospitalClinic
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

const deleteHospitalClinic = async(req,res,next)=>{
    try{
        const HospitalClinic = await HospitalClinicModel.findByIdAndDelete(req.params.id);
        res.data = HospitalClinic
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

module.exports = {getHospitalClinic, getHospitalClinicById, addHospitalClinic, updateHospitalClinic, deleteHospitalClinic}
