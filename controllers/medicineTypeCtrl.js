const MedicineModel = require("../models/medicineTypeModel")

const getMedicine = async(req,res,next)=>{
    try{
        const Medicine = await MedicineModel.find();
        res.data = Medicine
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

const getMedicineById = async(req,res,next)=>{
    try{
        const Medicine = await MedicineModel.findById(req.params.id);
        res.data = Medicine
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

const addMedicine = async(req,res,next)=>{
    try{
        const Medicine = await MedicineModel.create(req.body);
        res.data = Medicine
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

const updateMedicine = async(req,res,next)=>{
    try{
        const Medicine = await MedicineModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Medicine
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

const deleteMedicine = async(req,res,next)=>{
    try{
        const Medicine = await MedicineModel.findByIdAndDelete(req.params.id);
        res.data = Medicine
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

module.exports = {getMedicine, getMedicineById, addMedicine, updateMedicine, deleteMedicine}
