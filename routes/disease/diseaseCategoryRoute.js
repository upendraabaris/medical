const router = require("express").Router()

const {getDiseaseCategory, getDiseaseCategoryById, addDiseaseCategory, updateDiseaseCategory, deleteDiseaseCategory} = require("../../controllers/disease/diseaseCategoryCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getDiseaseCategory)

router.get('/:id', verifyToken, getDiseaseCategoryById)

router.post('/addDiseaseCategory', verifyToken, addDiseaseCategory)

router.put('/updateDiseaseCategory/:id', verifyToken, updateDiseaseCategory)

router.delete('/deleteDiseaseCategory/:id', verifyToken, deleteDiseaseCategory)

module.exports = router