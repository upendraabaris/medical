const RadiologyDiagnosisModel = require("../models/radiologyDiagnosisModel")
const Client = require("../middleware/redis")
const getRadiologyDiagnosis = async(req,res,next)=>{
    try{
        // let client = await Client.get('RadiologyDiagnosis');
        // let RadiologyDiagnosis;
        // if(client == null) {
        //     RadiologyDiagnosis = await RadiologyDiagnosisModel.find()
        //     await Client.set(`RadiologyDiagnosis`, JSON.stringify(RadiologyDiagnosis));
        // }
        // else {
        //     RadiologyDiagnosis = JSON.parse(client);
        // }
        const RadiologyDiagnosis = await RadiologyDiagnosisModel.find()
        res.data = RadiologyDiagnosis
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

const getRadiologyDiagnosisById = async(req,res,next)=>{
    try{
        const RadiologyDiagnosis = await RadiologyDiagnosisModel.findById(req.params.id);
        res.data = RadiologyDiagnosis
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

const addRadiologyDiagnosis = async(req,res,next)=>{
    try{
        console.log(req.body);
        const RadiologyDiagnosis = await RadiologyDiagnosisModel.create(req.body);

        res.data = RadiologyDiagnosis
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

const updateRadiologyDiagnosis = async(req,res,next)=>{
    try{
        const RadiologyDiagnosis = await RadiologyDiagnosisModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = RadiologyDiagnosis
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

const deleteRadiologyDiagnosis = async(req,res,next)=>{
    try{
        const RadiologyDiagnosis = await RadiologyDiagnosisModel.findByIdAndDelete(req.params.id);
        res.data = RadiologyDiagnosis
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

const deleteAllRadiologyDiagnosis = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHistory = await RadiologyDiagnosisModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteHistory;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
    }
}

module.exports = {getRadiologyDiagnosis, getRadiologyDiagnosisById, addRadiologyDiagnosis, updateRadiologyDiagnosis, deleteRadiologyDiagnosis, deleteAllRadiologyDiagnosis}
