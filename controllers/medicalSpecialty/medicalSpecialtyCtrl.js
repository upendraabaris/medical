const MedicalSpecialtyModel = require("../../models/medicalSpecialty/medicalSpecialtyModel")

const getMedicalSpecialty = async(req,res,next)=>{
    try{
        const MedicalSpecialty = await MedicalSpecialtyModel.find();
        res.data = MedicalSpecialty
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

const getMedicalSpecialtyById = async(req,res,next)=>{
    try{
        const MedicalSpecialty = await MedicalSpecialtyModel.findById(req.params.id);
        res.data = MedicalSpecialty
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

const addMedicalSpecialty = async(req,res,next)=>{
    try{
        const MedicalSpecialty = await MedicalSpecialtyModel.create(req.body);
        res.data = MedicalSpecialty
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

const updateMedicalSpecialty = async(req,res,next)=>{
    try{
        const MedicalSpecialty = await MedicalSpecialtyModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = MedicalSpecialty
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

const deleteMedicalSpecialty = async(req,res,next)=>{
    try{
        const MedicalSpecialty = await MedicalSpecialtyModel.findByIdAndDelete(req.params.id);
        res.data = MedicalSpecialty
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

module.exports = {getMedicalSpecialty, getMedicalSpecialtyById, addMedicalSpecialty, updateMedicalSpecialty, deleteMedicalSpecialty}
