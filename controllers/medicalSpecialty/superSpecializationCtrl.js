const SuperSpecializationModel = require("../../models/medicalSpecialty/superSpecializationModel")

const getSuperSpecialization = async(req,res,next)=>{
    try{
        const SuperSpecialization = await SuperSpecializationModel.find().populate({
            path: 'medicalSpecialtyId subSpecialityId',
            select: 'sub_speciality medical_specialty medical_specialty_icon'
          }).sort({ super_specialization: 1 });
          
        res.data = SuperSpecialization
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

const getSuperSpecializationById = async(req,res,next)=>{
    try{
        const SuperSpecialization = await SuperSpecializationModel.findById(req.params.id);
        res.data = SuperSpecialization
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

const addSuperSpecialization = async(req,res,next)=>{
    try{
        const SuperSpecialization = await SuperSpecializationModel.create(req.body);
        res.data = SuperSpecialization
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

const updateSuperSpecialization = async(req,res,next)=>{
    try{
        const SuperSpecialization = await SuperSpecializationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SuperSpecialization
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

const deleteSuperSpecialization = async(req,res,next)=>{
    try{
        const SuperSpecialization = await SuperSpecializationModel.findByIdAndDelete(req.params.id);
        res.data = SuperSpecialization
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

module.exports = {getSuperSpecialization, getSuperSpecializationById, addSuperSpecialization, updateSuperSpecialization, deleteSuperSpecialization}
