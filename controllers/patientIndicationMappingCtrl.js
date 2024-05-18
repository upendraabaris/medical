const PatientIndicationMappingModel = require("../models/patientIndicationMapping")
const Client = require("../middleware/redis")
const getPatientIndicationMapping = async(req,res,next)=>{
    try{
        // let client = await Client.get('PatientIndicationMapping');
        // let PatientIndicationMapping;
        // if(client == null) {
        //     PatientIndicationMapping = await PatientIndicationMappingModel.find()
        //     await Client.set(`PatientIndicationMapping`, JSON.stringify(PatientIndicationMapping));
        // }
        // else {
        //     PatientIndicationMapping = JSON.parse(client);
        // }
        PatientIndicationMapping = await PatientIndicationMappingModel.find({patient_id: req.params.id})
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname')
        .populate('indication_id', 'indication_name category');
        res.data = PatientIndicationMapping
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

const getPatientIndicationMappingById = async(req,res,next)=>{
    try{
        const PatientIndicationMapping = await PatientIndicationMappingModel.findById(req.params.id);
        res.data = PatientIndicationMapping
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

const addPatientIndicationMapping = async(req,res,next)=>{
    try{
        let health_facility_id = req.user
        req.body.health_facility_id = health_facility_id
        const PatientIndicationMapping = await PatientIndicationMappingModel.create(req.body);
        res.data = PatientIndicationMapping
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

const updatePatientIndicationMapping = async(req,res,next)=>{
    try{
        const PatientIndicationMapping = await PatientIndicationMappingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = PatientIndicationMapping
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

const deletePatientIndicationMapping = async(req,res,next)=>{
    try{
        const PatientIndicationMapping = await PatientIndicationMappingModel.findByIdAndDelete(req.params.id);
        res.data = PatientIndicationMapping
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

const deleteAllVitalInformation = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteVitalInfo = await PatientIndicationMappingModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteVitalInfo;
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

const getPatientIndicationMappingByUserId = async(req,res,next)=>{
    try{
        let id = req.params.id
        console.log(id)
        const PatientIndicationMapping = await PatientIndicationMappingModel.find({user_id:id});
        res.data = PatientIndicationMapping
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


module.exports = {getPatientIndicationMapping, getPatientIndicationMappingById, addPatientIndicationMapping, updatePatientIndicationMapping, deletePatientIndicationMapping, deleteAllVitalInformation, getPatientIndicationMappingByUserId}
