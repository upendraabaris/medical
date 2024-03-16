const router = require("express").Router()

const {getPreExistingDisease, getPreExistingDiseaseById, addPreExistingDisease, updatePreExistingDisease, deletePreExistingDisease} = require("../../controllers/disease/preExistingDiseaseCtrl")

router.get('/', getPreExistingDisease)

router.get('/:id', getPreExistingDiseaseById)

router.post('/addPreExistingDisease', addPreExistingDisease)

router.put('/updatePreExistingDisease/:id', updatePreExistingDisease)

router.delete('/deletePreExistingDisease/:id', deletePreExistingDisease)

module.exports = router