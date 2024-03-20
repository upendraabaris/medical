const PatientVitalInformationModel = require("../models/patientVitalInfoModel")
const Client = require("../middleware/redis")
const getPatientVitalInformation = async(req,res,next)=>{
    try{
        let client = await Client.get('PatientVitalInformation');
        let PatientVitalInformation;
        if(client == null) {
            PatientVitalInformation = await PatientVitalInformationModel.find()
            await Client.set(`PatientVitalInformation`, JSON.stringify(PatientVitalInformation));
        }
        else {
            PatientVitalInformation = JSON.parse(client);
        }
        res.data = PatientVitalInformation
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

const getPatientVitalInformationById = async(req,res,next)=>{
    try{
        const PatientVitalInformation = await PatientVitalInformationModel.findById(req.params.id);
        res.data = PatientVitalInformation
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

const addPatientVitalInformation = async(req,res,next)=>{
    try{
        const PatientVitalInformation = await PatientVitalInformationModel.create(req.body);
        res.data = PatientVitalInformation
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

const updatePatientVitalInformation = async(req,res,next)=>{
    try{
        const PatientVitalInformation = await PatientVitalInformationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = PatientVitalInformation
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

const deletePatientVitalInformation = async(req,res,next)=>{
    try{
        const PatientVitalInformation = await PatientVitalInformationModel.findByIdAndDelete(req.params.id);
        res.data = PatientVitalInformation
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

module.exports = {getPatientVitalInformation, getPatientVitalInformationById, addPatientVitalInformation, updatePatientVitalInformation, deletePatientVitalInformation}
