const MedicalSpecialtyModel = require("../../models/medicalSpecialty/medicalSpecialtyModel")

const getMedicalSpecialty = async(req,res,next)=>{
    try{
        // const MedicalSpecialty = await MedicalSpecialtyModel.find().populate('superSpecialty');
        const MedicalSpecialty = await MedicalSpecialtyModel.aggregate([
            {
              $lookup: {
                from: "superspecializations", // Name of the collection to join
                localField: "superSpecialty",
                foreignField: "_id",
                as: "super_specialty_data"
              }
            },
            {
              $project: {
                _id: 1,
                medical_specialty: 1,
                medical_specialty_icon: 1,
                superSpecialty: "$super_specialty_data.super_specialization" // Access the name field from the joined collection
              }
            }
          ]).sort({ medical_specialty: 1 });
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
