const ClinicalDiagnosisModel = require("../models/clinicalDiagnosisModel")

const getClinicalDiagnosis = async(req,res,next)=>{
    try{
        // let client = await Client.get('ClinicalDiagnosis');
        // let ClinicalDiagnosis;
        // if(client == null) {
        //     ClinicalDiagnosis = await ClinicalDiagnosisModel.find()
        //     await Client.set(`ClinicalDiagnosis`, JSON.stringify(ClinicalDiagnosis));
        // }
        // else {
        //     ClinicalDiagnosis = JSON.parse(client);
        // }
        const ClinicalDiagnosis = await ClinicalDiagnosisModel.find()
        res.data = ClinicalDiagnosis
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

const getClinicalDiagnosisById = async(req,res,next)=>{
    try{
        const ClinicalDiagnosis = await ClinicalDiagnosisModel.findById(req.params.id);
        res.data = ClinicalDiagnosis
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

const addClinicalDiagnosis = async(req,res,next)=>{
    try{
        const ClinicalDiagnosis = await ClinicalDiagnosisModel.create(req.body);
        res.data = ClinicalDiagnosis
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

const updateClinicalDiagnosis = async(req,res,next)=>{
    try{
        const ClinicalDiagnosis = await ClinicalDiagnosisModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ClinicalDiagnosis
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

const deleteClinicalDiagnosis = async(req,res,next)=>{
    try{
        const ClinicalDiagnosis = await ClinicalDiagnosisModel.findByIdAndDelete(req.params.id);
        res.data = ClinicalDiagnosis
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

module.exports = {getClinicalDiagnosis, getClinicalDiagnosisById, addClinicalDiagnosis, updateClinicalDiagnosis, deleteClinicalDiagnosis}
