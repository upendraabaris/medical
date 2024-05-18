const SubSpecialityModel = require("../../models/medicalSpecialty/subSpecialityModel")

const getSubSpeciality = async(req,res,next)=>{
    try{
        const SubSpeciality = await SubSpecialityModel.find().populate({path:'medicalSpecialtyId', select:'medical_specialty'}).sort({ sub_speciality: 1 });
        res.data = SubSpeciality
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

const getSubSpecialityById = async(req,res,next)=>{
    try{
        const SubSpeciality = await SubSpecialityModel.findById(req.params.id);
        res.data = SubSpeciality
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

const addSubSpeciality = async(req,res,next)=>{
    try{
        const SubSpeciality = await SubSpecialityModel.create(req.body);
        res.data = SubSpeciality
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

const updateSubSpeciality = async(req,res,next)=>{
    try{
        const SubSpeciality = await SubSpecialityModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SubSpeciality
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

const deleteSubSpeciality = async(req,res,next)=>{
    try{
        const SubSpeciality = await SubSpecialityModel.findByIdAndDelete(req.params.id);
        res.data = SubSpeciality
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

module.exports = {getSubSpeciality, getSubSpecialityById, addSubSpeciality, updateSubSpeciality, deleteSubSpeciality}
