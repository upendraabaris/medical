const DoctorAttendentModel = require("../models/doctorAttendentModel")

const getDoctorAttendent = async(req,res,next)=>{
    try{
        // let client = await Client.get('DoctorAttendent');
        // let DoctorAttendent;
        // if(client == null) {
        //     DoctorAttendent = await DoctorAttendentModel.find()
        //     await Client.set(`DoctorAttendent`, JSON.stringify(DoctorAttendent));
        // }
        // else {
        //     DoctorAttendent = JSON.parse(client);
        // }
        const DoctorAttendent = await DoctorAttendentModel.find().populate({ path: 'associateHospitalName', select: 'hos_clinic_name' })
        .populate({ 
            path: 'associateDoctorName', 
            select: 'firstname lastname city state addressLine1',
            // populate: {
            //     path: 'sellerType',
            //     model: 'UserType',
            //     select: 'user_type'
            // }
        })
        .lean();
        res.data = DoctorAttendent
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

const getDoctorAttendentById = async(req,res,next)=>{
    try{
        const DoctorAttendent = await DoctorAttendentModel.findById(req.params.id);
        res.data = DoctorAttendent
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

const addDoctorAttendent = async(req,res,next)=>{
    try{
        const DoctorAttendent = await DoctorAttendentModel.create(req.body);
        res.data = DoctorAttendent
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

const updateDoctorAttendent = async(req,res,next)=>{
    try{
        const DoctorAttendent = await DoctorAttendentModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = DoctorAttendent
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

const deleteDoctorAttendent = async(req,res,next)=>{
    try{
        const DoctorAttendent = await DoctorAttendentModel.findByIdAndDelete(req.params.id);
        res.data = DoctorAttendent
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

module.exports = {getDoctorAttendent, getDoctorAttendentById, addDoctorAttendent, updateDoctorAttendent, deleteDoctorAttendent}
