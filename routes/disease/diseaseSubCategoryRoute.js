const router = require("express").Router()

const {getDiseaseSubCategory, getDiseaseSubCategoryById, addDiseaseSubCategory, updateDiseaseSubCategory, deleteDiseaseSubCategory} = require("../../controllers/disease/diseaseSubCategoryCtrl")

router.get('/', getDiseaseSubCategory)

router.get('/:id', getDiseaseSubCategoryById)

router.post('/addDiseaseSubCategory', addDiseaseSubCategory)

router.put('/updateDiseaseSubCategory/:id', updateDiseaseSubCategory)

router.delete('/deleteDiseaseSubCategory/:id', deleteDiseaseSubCategory)

module.exports = router