const PreExistingDiseaseModel = require("../../models/disease/preExistingDiseaseModel")

const getPreExistingDisease = async(req,res,next)=>{
    try{
        const PreExistingDisease = await PreExistingDiseaseModel.find();
        res.data = PreExistingDisease
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

const getPreExistingDiseaseById = async(req,res,next)=>{
    try{
        const PreExistingDisease = await PreExistingDiseaseModel.findById(req.params.id);
        res.data = PreExistingDisease
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

const addPreExistingDisease = async(req,res,next)=>{
    try{
        const PreExistingDisease = await PreExistingDiseaseModel.create(req.body);
        res.data = PreExistingDisease
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

const updatePreExistingDisease = async(req,res,next)=>{
    try{
        const PreExistingDisease = await PreExistingDiseaseModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = PreExistingDisease
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

const deletePreExistingDisease = async(req,res,next)=>{
    try{
        const PreExistingDisease = await PreExistingDiseaseModel.findByIdAndDelete(req.params.id);
        res.data = PreExistingDisease
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

module.exports = {getPreExistingDisease, getPreExistingDiseaseById, addPreExistingDisease, updatePreExistingDisease, deletePreExistingDisease}
