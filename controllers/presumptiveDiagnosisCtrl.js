const PresumptiveDiagnosisModel = require("../models/presumptiveDiagnosisModel")
const Client = require("../middleware/redis")
const getPresumptiveDiagnosis = async(req,res,next)=>{
    try{
        // let client = await Client.get('PresumptiveDiagnosis');
        // let PresumptiveDiagnosis;
        // if(client == null) {
        //     PresumptiveDiagnosis = await PresumptiveDiagnosisModel.find()
        //     await Client.set(`PresumptiveDiagnosis`, JSON.stringify(PresumptiveDiagnosis));
        // }
        // else {
        //     PresumptiveDiagnosis = JSON.parse(client);
        // }
        const PresumptiveDiagnosis = await PresumptiveDiagnosisModel.find().populate({ path: 'medical_specialty_id', select: 'medical_specialty' })
        res.data = PresumptiveDiagnosis
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

const getPresumptiveDiagnosisById = async(req,res,next)=>{
    try{
        const PresumptiveDiagnosis = await PresumptiveDiagnosisModel.findById(req.params.id);
        res.data = PresumptiveDiagnosis
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

const addPresumptiveDiagnosis = async(req,res,next)=>{
    try{
        const PresumptiveDiagnosis = await PresumptiveDiagnosisModel.create(req.body);
        res.data = PresumptiveDiagnosis
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

const updatePresumptiveDiagnosis = async(req,res,next)=>{
    try{
        const PresumptiveDiagnosis = await PresumptiveDiagnosisModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = PresumptiveDiagnosis
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

const deletePresumptiveDiagnosis = async(req,res,next)=>{
    try{
        const PresumptiveDiagnosis = await PresumptiveDiagnosisModel.findByIdAndDelete(req.params.id);
        res.data = PresumptiveDiagnosis
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

const deleteAllPresumptiveDiagnosis = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deletePresumptiveDiagnosis = await PresumptiveDiagnosisModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deletePresumptiveDiagnosis;
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

module.exports = {getPresumptiveDiagnosis, getPresumptiveDiagnosisById, addPresumptiveDiagnosis, updatePresumptiveDiagnosis, deletePresumptiveDiagnosis, deleteAllPresumptiveDiagnosis}
