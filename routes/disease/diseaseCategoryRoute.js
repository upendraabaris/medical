const router = require("express").Router()

const {getDiseaseCategory, getDiseaseCategoryById, addDiseaseCategory, updateDiseaseCategory, deleteDiseaseCategory} = require("../../controllers/disease/diseaseCategoryCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getDiseaseCategory)

router.get('/:id', staffMiddleware, getDiseaseCategoryById)

router.post('/addDiseaseCategory', staffMiddleware, addDiseaseCategory)

router.put('/updateDiseaseCategory/:id', staffMiddleware, updateDiseaseCategory)

router.delete('/deleteDiseaseCategory/:id', staffMiddleware, deleteDiseaseCategory)

module.exports = router