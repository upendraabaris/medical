const ChiefComplaintModel = require("../models/chiefComplaintModel")
const Client = require("../middleware/redis")
const MedicalConsultationQuestion = require("../models/medicalConsultationModel")

const getChiefComplaint = async(req,res,next)=>{
    try{
        // let client = await Client.get('ChiefComplaint');
        // let ChiefComplaint;
        // if(client == null) {
        //     ChiefComplaint = await ChiefComplaintModel.find()
        //     await Client.set(`ChiefComplaint`, JSON.stringify(ChiefComplaint));
        // }
        // else {
        //     ChiefComplaint = JSON.parse(client);
        // }
        const ChiefComplaint = await ChiefComplaintModel.find()
        res.data = ChiefComplaint
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

const getChiefComplaintOfNewBorn = async(req,res,next)=>{
    try{
        const ChiefComplaint = await ChiefComplaintModel.find({patient_type: 'Newborn'})
        res.data = ChiefComplaint
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

const getChiefComplaintById = async(req,res,next)=>{
    try{
        const ChiefComplaint = await ChiefComplaintModel.findById(req.params.id);
        res.data = ChiefComplaint
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

const addChiefComplaint = async(req,res,next)=>{
    try{
        // const check = await ChiefComplaintModel.findOne({chief_complaint:req.body.chief_complaint})
        // if(check){
        //     return res.json({message: "already exist in database"})
        // }
        const ChiefComplaint = await ChiefComplaintModel.create(req.body);
        res.data = ChiefComplaint
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

const updateChiefComplaint = async(req,res,next)=>{
    try{
        const ChiefComplaint = await ChiefComplaintModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = ChiefComplaint
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

const deleteChiefComplaint = async(req,res,next)=>{
    try{
        const ChiefComplaint = await ChiefComplaintModel.findByIdAndDelete(req.params.id);
        res.data = ChiefComplaint
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

const deleteAllChiefComplaints = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deletedComplaints = await ChiefComplaintModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deletedComplaints;
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


const addData = async (req, res) => {
    try {
      const chiefComplaintsList = req.body.list;
      console.log(chiefComplaintsList);
      const chiefComplaintsData = chiefComplaintsList.map((complaint, index) => ({
        chief_complaint_id: index + 1,
        chief_complaint: complaint,
        chief_complaint_banner_image: `https://example.com/${complaint.toLowerCase().replace(/\s/g, '-')}-banner.jpg`,
        chief_complaint_banner_video: `https://example.com/${complaint.toLowerCase().replace(/\s/g, '-')}-video.mp4`,
      }));
      await ChiefComplaintModel.insertMany(chiefComplaintsData);
      res.status(201).json({ message: 'Chief complaints added successfully.' });
    } catch (error) {
      console.error('Error adding chief complaints:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getMedicalConsultant = async (req, res, next) => {
    try {
        const questions = await MedicalConsultationQuestion.find().populate({path:'symptoms', select:'chief_complaint'})
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


module.exports = {getChiefComplaint, getChiefComplaintById, addChiefComplaint, updateChiefComplaint, deleteChiefComplaint, deleteAllChiefComplaints, addData, getMedicalConsultant, getChiefComplaintOfNewBorn}