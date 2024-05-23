const MedicationModel = require("../models/medicationModel")
const Client = require("../middleware/redis")
const getMedication = async(req,res,next)=>{
    try{
        // let client = await Client.get('Medication');
        // let Medication;
        // if(client == null) {
        //     Medication = await MedicationModel.find()
        //     await Client.set(`Medication`, JSON.stringify(Medication));
        // }
        // else {
        //     Medication = JSON.parse(client);
        // }
        const Medication = await MedicationModel.find()
        res.data = Medication
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

const getMedicationById = async(req,res,next)=>{
    try{
        const Medication = await MedicationModel.findById(req.params.id);
        res.data = Medication
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

const addMedication = async(req,res,next)=>{
    try{
        // console.log(req.body);
        const Medication = await MedicationModel.create(req.body);
        res.data = Medication
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

const updateMedication = async(req,res,next)=>{
    try{
        const Medication = await MedicationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Medication
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

const deleteMedication = async(req,res,next)=>{
    try{
        const Medication = await MedicationModel.findByIdAndDelete(req.params.id);
        res.data = Medication
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

const deleteAllMedication = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHistory = await MedicationModel.deleteMany({_id: { $in: idToDelete}});
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

module.exports = {getMedication, getMedicationById, addMedication, updateMedication, deleteMedication, deleteAllMedication}
