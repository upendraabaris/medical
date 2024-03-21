const router = require("express").Router()

const {getDiseaseSubCategory, getDiseaseSubCategoryById, addDiseaseSubCategory, updateDiseaseSubCategory, deleteDiseaseSubCategory} = require("../../controllers/disease/diseaseSubCategoryCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getDiseaseSubCategory)

router.get('/:id', staffMiddleware, getDiseaseSubCategoryById)

router.post('/addDiseaseSubCategory', staffMiddleware, addDiseaseSubCategory)

router.put('/updateDiseaseSubCategory/:id', staffMiddleware, updateDiseaseSubCategory)

router.delete('/deleteDiseaseSubCategory/:id', staffMiddleware, deleteDiseaseSubCategory)

module.exports = router