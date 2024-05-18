const SystemicExaminationModel = require("../models/systemicExaminationModel")
const Client = require("../middleware/redis")
const getSystemicExamination = async(req,res,next)=>{
    try{
        // let client = await Client.get('SystemicExamination');
        // let SystemicExamination;
        // if(client == null) {
        //     SystemicExamination = await SystemicExaminationModel.find()
        //     await Client.set(`SystemicExamination`, JSON.stringify(SystemicExamination));
        // }
        // else {
        //     SystemicExamination = JSON.parse(client);
        // }
        const SystemicExamination = await SystemicExaminationModel.findOne()
        .populate('patient_id', 'mother_name father_name')
        .populate('addedBy', 'first_name last_name')
        .populate('health_facility_id', 'firstname lastname');
        res.data = SystemicExamination
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


const getSystemicExaminationById = async(req,res,next)=>{
    try{
        const SystemicExamination = await SystemicExaminationModel.findById(req.params.id);
        res.data = SystemicExamination
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

const addSystemicExamination = async(req,res,next)=>{
    try{
        console.log(req.user)
        let health_facility_id = req.user
        req.body.health_facility_id = health_facility_id
        const SystemicExamination = await SystemicExaminationModel.create(req.body);
        res.data = SystemicExamination
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

const updateSystemicExamination = async(req,res,next)=>{
    try{
        const SystemicExamination = await SystemicExaminationModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SystemicExamination
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

const deleteSystemicExamination = async(req,res,next)=>{
    try{
        const SystemicExamination = await SystemicExaminationModel.findByIdAndDelete(req.params.id);
        res.data = SystemicExamination
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

const deleteAllSystemicExamination = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHistory = await SystemicExaminationModel.deleteMany({_id: { $in: idToDelete}});
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

module.exports = {getSystemicExamination, getSystemicExaminationById, addSystemicExamination, updateSystemicExamination, deleteSystemicExamination, deleteAllSystemicExamination}
