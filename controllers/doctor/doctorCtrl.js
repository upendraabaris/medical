const DoctorModel = require("../../models/doctor/doctorModel")
const UserModel = require("../../models/user/userModel")

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


const getFavorite = async(req,res, next) =>{
    try{
        const user = await UserModel.findById(req.user)
        let filter = { _id: { $in: user.isFavorite } };
        if(req.params.id != null && req.params.id != "null" && req.params.id != ""){
            filter = { ...filter, hos_clinic_type_id: req.params.id }
        }
        let [favorite] = await Promise.all([HospitalClinicModel.find(filter)])
        res.data = { favorite }
        next()
    }
    catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}



const getDoctorPublic = async(req,res,next)=>{
    try{
        const user = await UserModel.findById(req.user)
        let filter = { _id: { $nin: user.isFavorite } };
        if(req.params.id != null && req.params.id != "null" && req.params.id != ""){
            filter = { ...filter, hos_clinic_type_id: req.params.id }
        }
        const HospitalClinic = await HospitalClinicModel.find(filter).skip(req.query.page*req.query.count).limit(req.query.count).populate('hos_clinic_type_id');
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


module.exports = {getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor, getFavorite, getDoctorPublic}
