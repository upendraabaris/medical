const router = require("express").Router()


const {getEmr, getEmrById, addEmr, updateEmr, deleteEmr, addEmrData, getQuestionaaire} = require("../../controllers/emr/emrCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")
const { responseSend } = require("../../utils/response")

router.post('/getQuestionaaire/public', getQuestionaaire, responseSend)

router.get('/', staffMiddleware, getEmr)

router.get('/:id', staffMiddleware, getEmrById)

router.post('/addEmr', staffMiddleware, addEmr)

router.put('/updateEmr/:id', staffMiddleware, updateEmr)

router.delete('/deleteEmr/:id', staffMiddleware, deleteEmr)


router.post('/addEmrData', addEmrData)

const emr = require("../../models/emr/emrModel")
const emrOptionModel = require("../../models/emr/emrOptionModel")
const emrPictureGalleryModel = require("../../models/emr/emrPictureGalleryModel")
const emrQuestionTypeModel = require("../../models/emr/emrQuestionTypeModel")
const emrResponseModel = require("../../models/emr/emrResponseModel")
const ChiefComplaintModel = require("../../models/chiefComplaintModel")

const MedicalConsultationQuestion = require("../../models/medicalConsultationModel")
router.post('/adddata', async(req,res,next)=>{
    try{
        let chiefComplaint = [];
        /* let array = []; // Your array of objects
        let uniqueIds = new Set(); // Set to store unique identifiers

        // Iterate over your array of objects
        for (let obj of array) {
            // Assuming each object has a unique identifier stored in the id property
            if (!uniqueIds.has(obj.id)) {
                // If the unique identifier is not already in the set, push the object into the array
                array.push(obj);
                // Add the unique identifier to the set
                uniqueIds.add(obj.id);
            } */
//        }
    
        // req.body.list.forEach((question) =>{
        //     chiefComplaint.push(ChiefComplaintModel.findOne({ chief_complaint: new RegExp(question.symptoms, "i") }));
            
        // })
        // const complaints = await Promise.all(chiefComplaint);
//        console.log(complaints.length)
        let questions = [];
        let options = [];
        req.body.list.forEach((question) => {
            let data  = question;
            // let chief = complaints.find((item) => item?.chief_complaint == question.symptoms);
            // if(chief == undefined) {

            // }
                
                // console.log(data.question)
                 
                // console.log(data)
                let optionAvail = [];
                Object.keys(data).forEach((key) => {
                    if(key.slice(0,6) == "option"){
                        optionAvail.push(data[key])                     
                    }
                          
                })
                
                console.log(optionAvail)
                let questionnaire = new MedicalConsultationQuestion({
                    category: data.category,
                    type:data.type,
                    symptoms: data.symptoms,
                    img_banner: data.img_banner,
                    question: data.question,
                    options: optionAvail
                })
                questions.push(questionnaire)
            // const savedEmrMaster = await emr.save();
           
            
        })
        let data = [];
        questions.forEach((question)=>{
            console.log(question)
            data.push(question.save())
        })
        await Promise.all(data)
        res.json({questions})   
    }catch(error){
        res.json({message: error.message})
    }
})





module.exports = router