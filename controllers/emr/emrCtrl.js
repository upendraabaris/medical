const EmrModel = require("../../models/emr/emrModel")
const emrOptionModel = require("../../models/emr/emrOptionModel")
const EMRQuestionModel = require("../../routes/emr/emrQuestionTypeRoute")
const getEmr = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.find();
        res.data = Emr
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

const getEmrById = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.findById(req.params.id);
        res.data = Emr
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

const addEmr = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.create(req.body);
        res.data = Emr
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

const updateEmr = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Emr
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

const deleteEmr = async(req,res,next)=>{
    try{
        const Emr = await EmrModel.findByIdAndDelete(req.params.id);
        res.data = Emr
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

// const addEmrData = async (req, res) => {
//     try {
//         // Extract data from request body
//         const { category, qdata } = req.body;

//         // Create EMR master document
//         const emrMaster = new EmrModel({ category });

//         // Save EMR master document to database
//         await emrMaster.save();

//         // Iterate through question data and create EMR option documents
//         for (const questionData of qdata) {
//             const emrOptionMaster = new emrOptionModel({
//                 emr_id: emrMaster._id,
//                 emr_option_text: questionData.question
//             });
//             await emrOptionMaster.save();
//         }

//         res.status(201).json({ message: 'data created successfully' });
//     } catch (error) {
//         console.error('Error creating data:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }


const addEmrData = async (req, res) => {
    try {
        const { category, qdata } = req.body;

        // Create EMR Master
        const emrMaster = new EmrModel({
            chief_complaint_id: req.body.chief_complaint_id,
            medical_specialty_id: req.body.medical_specialty_id,
            emr_question: category,
            emr_question_type_id: req.body.emr_question_type_id,
            emr_question_description: req.body.emr_question_description,
            emr_question_banner_image: req.body.emr_question_banner_image,
            emr_question_banner_video: req.body.emr_question_banner_video,
            emr_question_weitage: req.body.emr_question_weitage
        });
        const savedEmrMaster = await emrMaster.save();


        // Create EMR Options
        // const EmrQuestionType = qdata.map(async (question) => {
        //     const EMRQuestion = new EMRQuestionModel({
        //         emr_question_type: question.ans_type,
        //     });
        //     return await EMRQuestion.save();
        // });
        // const savedEmrQuestionType = await Promise.all(EmrQuestionType);

        // Create EMR Options
        const emrOptions = qdata.map(async (question) => {
            const emrOption = new emrOptionModel({
                emr_id: savedEmrMaster._id,
                emr_option_text: question.question,
            });
            return await emrOption.save();
        });
        const savedEmrOptions = await Promise.all(emrOptions);

        res.status(201).json({ message: 'Data added successfully', emrMaster: savedEmrMaster, emrOptions: savedEmrOptions});
    } catch (error) {
        res.status(500).json({ message: 'Failed to add data', error: error.message });
    }
};

module.exports = {getEmr, getEmrById, addEmr, updateEmr, deleteEmr, addEmrData}
