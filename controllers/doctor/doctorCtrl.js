const DoctorModel = require("../../models/doctor/doctorModel")

const getDoctor = async(req,res,next)=>{
    try{
        const Doctor = await DoctorModel.find();
        res.data = Doctor
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

const getDoctorById = async(req,res,next)=>{
    try{
        const Doctor = await DoctorModel.findById(req.params.id);
        res.data = Doctor
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

const addDoctor = async(req,res,next)=>{
    try{
        const Doctor = await DoctorModel.create(req.body);
        res.data = Doctor
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

const updateDoctor = async(req,res,next)=>{
    try{
        const Doctor = await DoctorModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Doctor
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

const deleteDoctor = async(req,res,next)=>{
    try{
        const Doctor = await DoctorModel.findByIdAndDelete(req.params.id);
        res.data = Doctor
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

module.exports = {getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor}
