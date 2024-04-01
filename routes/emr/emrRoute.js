const router = require("express").Router()

const {getEmr, getEmrById, addEmr, updateEmr, deleteEmr, addEmrData, getQuestionaaire} = require("../../controllers/emr/emrCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/getQuestionaaire/public', getQuestionaaire)

router.get('/', staffMiddleware, getEmr)

router.get('/:id', staffMiddleware, getEmrById)

router.post('/addEmr', /* staffMiddleware, */ addEmr)

router.put('/updateEmr/:id', staffMiddleware, updateEmr)

router.delete('/deleteEmr/:id', staffMiddleware, deleteEmr)


// router.post('/addEmrData', addEmrData)

const emr = require("../../models/emr/emrModel")
const emrOptionModel = require("../../models/emr/emrOptionModel")
const emrPictureGalleryModel = require("../../models/emr/emrPictureGalleryModel")
const emrQuestionTypeModel = require("../../models/emr/emrQuestionTypeModel")
const emrResponseModel = require("../../models/emr/emrResponseModel")

router.post('/adddata', (req,res,next)=>{
    try{
        list.forEach((question) => {
            let data  = question;
            data.id = undefined;
            data.question = undefined,
        
            Object.keys(data).forEach((key) => {
                console.log(data.key);
            })
        })
    }catch(error){
        res.json({message: error.message})
    }
})

module.exports = router