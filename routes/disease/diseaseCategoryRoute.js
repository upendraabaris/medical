const router = require("express").Router()

const {getDiseaseCategory, getDiseaseCategoryById, addDiseaseCategory, updateDiseaseCategory, deleteDiseaseCategory} = require("../../controllers/disease/diseaseCategoryCtrl")

router.get('/', getDiseaseCategory)

router.get('/:id', getDiseaseCategoryById)

router.post('/addDiseaseCategory', addDiseaseCategory)

router.put('/updateDiseaseCategory/:id', updateDiseaseCategory)

router.delete('/deleteDiseaseCategory/:id', deleteDiseaseCategory)

module.exports = router