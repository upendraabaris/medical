const router = require("express").Router()

const {getDiseaseSubCategory, getDiseaseSubCategoryById, addDiseaseSubCategory, updateDiseaseSubCategory, deleteDiseaseSubCategory} = require("../../controllers/disease/diseaseSubCategoryCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getDiseaseSubCategory)

router.get('/:id', verifyToken, getDiseaseSubCategoryById)

router.post('/addDiseaseSubCategory', verifyToken, addDiseaseSubCategory)

router.put('/updateDiseaseSubCategory/:id', verifyToken, updateDiseaseSubCategory)

router.delete('/deleteDiseaseSubCategory/:id', verifyToken, deleteDiseaseSubCategory)

module.exports = router