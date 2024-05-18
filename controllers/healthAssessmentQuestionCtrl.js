const HealthAssessmentModel = require("../models/healthAssessmentQuestionModel")
const Client = require("../middleware/redis")
const getHealthAssessment = async(req,res,next)=>{
    try{
        // let client = await Client.get('HealthAssessment');
        // let HealthAssessment;
        // if(client == null) {
        //     HealthAssessment = await HealthAssessmentModel.find()
        //     await Client.set(`HealthAssessment`, JSON.stringify(HealthAssessment));
        // }
        // else {
        //     HealthAssessment = JSON.parse(client);
        // }
        const HealthAssessment = await HealthAssessmentModel.find()
        res.data = HealthAssessment
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

const getHealthAssessmentById = async(req,res,next)=>{
    try{
        const HealthAssessment = await HealthAssessmentModel.findById(req.params.id);
        res.data = HealthAssessment
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

const addHealthAssessment = async(req,res,next)=>{
    try{
        const HealthAssessment = await HealthAssessmentModel.create(req.body);
        res.data = HealthAssessment
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

const updateHealthAssessment = async(req,res,next)=>{
    try{
        const HealthAssessment = await HealthAssessmentModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = HealthAssessment
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

const deleteHealthAssessment = async(req,res,next)=>{
    try{
        const HealthAssessment = await HealthAssessmentModel.findByIdAndDelete(req.params.id);
        res.data = HealthAssessment
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

const deleteAllHealthAssessment = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteHealthAssessment = await HealthAssessmentModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteHealthAssessment;
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


module.exports = {getHealthAssessment, getHealthAssessmentById, addHealthAssessment, updateHealthAssessment, deleteHealthAssessment, deleteAllHealthAssessment}
