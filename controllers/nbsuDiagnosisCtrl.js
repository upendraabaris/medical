const NbsuDiagnosisMappingModel = require("../models/nbsuDiagnosisMappingModel")
const Client = require("../middleware/redis")
const getNbsuDiagnosisMapping = async(req,res,next)=>{
    try{
        const NbsuDiagnosisMapping = await NbsuDiagnosisMappingModel.find({patient_id: req.params.id})
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname')
        .populate('diagnosis_id', 'diagnosis category')
        // let client = await Client.get('NbsuDiagnosisMappingType');
        // let NbsuDiagnosisMapping;
        // if(client == null) {
        //     NbsuDiagnosisMapping = await NbsuDiagnosisMappingModel.find()
        //     await Client.set("NbsuDiagnosisMappingType", JSON.stringify(NbsuDiagnosisMapping));
        // }
        // else {
        //     NbsuDiagnosisMapping = JSON.parse(client);
        // }
        res.data = NbsuDiagnosisMapping
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

const getNbsuDiagnosisMappingById = async(req,res,next)=>{
    try{
        const NbsuDiagnosisMapping = await NbsuDiagnosisMappingModel.findById(req.params.id);
        res.data = NbsuDiagnosisMapping
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

const addNbsuDiagnosisMapping = async(req,res,next)=>{
    try{
        console.log(req.user)
        let health_facility_id = req.user
        req.body.health_facility_id = health_facility_id
        const NbsuDiagnosisMapping = await NbsuDiagnosisMappingModel.create(req.body);
        res.data = NbsuDiagnosisMapping
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

const updateNbsuDiagnosisMapping = async(req,res,next)=>{
    try{
        const NbsuDiagnosisMapping = await NbsuDiagnosisMappingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbsuDiagnosisMapping
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

const deleteNbsuDiagnosisMapping = async(req,res,next)=>{
    try{
        const NbsuDiagnosisMapping = await NbsuDiagnosisMappingModel.findByIdAndDelete(req.params.id);
        res.data = NbsuDiagnosisMapping
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

const deleteAllNbsuDiagnosisMappingType = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteNbsuDiagnosisMappingType = await NbsuDiagnosisMappingModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteNbsuDiagnosisMappingType;
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

module.exports = {getNbsuDiagnosisMapping, getNbsuDiagnosisMappingById, addNbsuDiagnosisMapping, updateNbsuDiagnosisMapping, deleteNbsuDiagnosisMapping, deleteAllNbsuDiagnosisMappingType}
