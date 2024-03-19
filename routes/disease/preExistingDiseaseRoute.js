const router = require("express").Router()

const {getPreExistingDisease, getPreExistingDiseaseById, addPreExistingDisease, updatePreExistingDisease, deletePreExistingDisease} = require("../../controllers/disease/preExistingDiseaseCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getPreExistingDisease)

router.get('/:id', verifyToken, getPreExistingDiseaseById)

router.post('/addPreExistingDisease', verifyToken, addPreExistingDisease)

router.put('/updatePreExistingDisease/:id', verifyToken, updatePreExistingDisease)

router.delete('/deletePreExistingDisease/:id', verifyToken, deletePreExistingDisease)

module.exports = router