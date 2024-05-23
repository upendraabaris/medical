const NbsuMedicationModel = require("../models/nbsuMedicationModel")
const Client = require("../middleware/redis")
const getNbsuMedication = async(req,res,next)=>{
    try{
        // let client = await Client.get('NbsuMedication');
        // let NbsuMedication;
        // if(client == null) {
        //     NbsuMedication = await NbsuMedicationModel.find()
        //     await Client.set(`NbsuMedication`, JSON.stringify(NbsuMedication));
        // }
        // else {
        //     NbsuMedication = JSON.parse(client);
        // }
        const NbsuMedication = await NbsuMedicationModel.find()
        res.data = NbsuMedication
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

const getNbsuMedicationById = async(req,res,next)=>{
    try{
        const NbsuMedication = await NbsuMedicationModel.findById(req.params.id);
        res.data = NbsuMedication
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

const addNbsuMedication = async(req,res,next)=>{
    try{
        // console.log(req.body);
        let addedBy = req.user
        req.body.addedBy = addedBy
        const NbsuMedication = await NbsuMedicationModel.create(req.body);
        res.data = NbsuMedication
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

const updateNbsuMedication = async(req,res,next)=>{
    try{
        const NbsuMedication = await NbsuMedicationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = NbsuMedication
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

const deleteNbsuMedication = async(req,res,next)=>{
    try{
        const NbsuMedication = await NbsuMedicationModel.findByIdAndDelete(req.params.id);
        res.data = NbsuMedication
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

const deleteAllNbsuMedication = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHistory = await NbsuMedicationModel.deleteMany({_id: { $in: idToDelete}});
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

module.exports = {getNbsuMedication, getNbsuMedicationById, addNbsuMedication, updateNbsuMedication, deleteNbsuMedication, deleteAllNbsuMedication}
