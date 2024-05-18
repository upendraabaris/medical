const MedicalConsultation = require("../models/medicalConsultationModel")

const getQuestion = async(req,res,next)=>{
    try{
        const Question = await MedicalConsultation.find()
        res.data = Question
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

const getQuestionById = async(req,res,next)=>{
    try{
        const Question = await MedicalConsultation.findById(req.params.id);
        res.data = Question
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

const addQuestion = async(req,res,next)=>{
    try{
        const Question = await MedicalConsultation.create(req.body);
        res.data = Question
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

const updateQuestion = async(req,res,next)=>{
    try{
        const Question = await MedicalConsultation.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Question
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

const deleteQuestion = async(req,res,next)=>{
    try{
        const Question = await MedicalConsultation.findByIdAndDelete(req.params.id);
        res.data = Question
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


const getMedicalConsultant = async (req, res, next) => {
    try {
        const questions = await MedicalConsultation.find().populate({path:'symptoms', select:'chief_complaint'})
        // const questions = await MedicalConsultationQuestion.aggregate([
        //     {
        //         $lookup: {
        //             from: "medical_consultation_questions",
        //             localField: "symptoms",
        //             foreignField: "chief_complaint",
        //             as: "symptoms"
        //         }
        //     },
        //     // {
        //     //     $unwind: "$symptoms"
        //     // },
        //     {
        //         $project: {
        //             _id: 1, // Exclude the _id field
        //             // chief_complaint: "$symptoms.chief_complaint" // Project the chief_complaint field from the symptoms collection
        //             category:1,
        //             symptom: "$symptoms.chief_complaint",
        //             img_banner:1,
        //             question:1,
        //             options:1                    
        //         }
        //     }
        // ]);
        res.data = questions;
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

const getMedicalConsultantBySymptom = async (req, res, next) => {
    try {
        // const { category, symptomId } = req.params; // Assuming the category is passed as a query parameter
        // const questions = await MedicalConsultation.find({ category, symptoms: symptomId })
        //     .populate({ path: 'symptoms', select: 'chief_complaint' })
        
        const list = req.body.list; // Assuming the category is passed as a query parameter
        const questions = await MedicalConsultation.find({ symptoms: list })
            .populate({ path: 'symptoms', select: 'chief_complaint' })
        
        
        res.data = questions;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next
    }
}

module.exports = {getQuestion, getQuestionById, addQuestion, updateQuestion, deleteQuestion, getMedicalConsultant, getMedicalConsultantBySymptom}
