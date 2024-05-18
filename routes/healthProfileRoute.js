const router = require("express").Router()
const {getHealthProfile, getHealthProfileById, addHealthProfile, updateHealthProfile, deleteHealthProfile, getHealthProfileByUserId, addData} = require("../controllers/healthProfileCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getHealthProfile, responseSend)

router.post('/addHealthProfile', staffMiddleware, addHealthProfile, responseSend)

router.post('/addHealthProfile/public', verifyToken, addHealthProfile, responseSend)

router.put('/updateHealthProfile/:id', staffMiddleware, updateHealthProfile, responseSend)

router.put('/updateHealthProfile/public/:id', verifyToken, updateHealthProfile, responseSend)

router.delete('/deleteHealthProfile/:id', staffMiddleware, deleteHealthProfile, responseSend)

router.get('/getHealthProfileByUserId/:id', /* verifyToken, */ getHealthProfileByUserId)

router.post('/addData', addData, responseSend)

// router.get('/:id', staffMiddleware, getHealthProfileById, responseSend)
module.exports = router