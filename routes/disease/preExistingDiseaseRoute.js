const router = require("express").Router()

const {getPreExistingDisease, getPreExistingDiseaseById, addPreExistingDisease, updatePreExistingDisease, deletePreExistingDisease} = require("../../controllers/disease/preExistingDiseaseCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getPreExistingDisease)

router.get('/:id', staffMiddleware, getPreExistingDiseaseById)

router.post('/addPreExistingDisease', staffMiddleware, addPreExistingDisease)

router.put('/updatePreExistingDisease/:id', staffMiddleware, updatePreExistingDisease)

router.delete('/deletePreExistingDisease/:id', staffMiddleware, deletePreExistingDisease)

module.exports = router