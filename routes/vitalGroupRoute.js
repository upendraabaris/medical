const router = require("express").Router()
const {getVitalGroup, getVitalGroupById, addVitalGroup, updateVitalGroup, deleteVitalGroup, deleteAllVitalGroup, getVitalGroupByUserId} = require("../controllers/vitalGroupCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getVitalGroup, responseSend)

router.get('/:id', staffMiddleware, getVitalGroupById, responseSend)

router.post('/addVitalGroup', staffMiddleware, addVitalGroup, responseSend)

router.put('/updateVitalGroup/:id', staffMiddleware, updateVitalGroup, responseSend)

router.delete('/deleteVitalGroup/:id', staffMiddleware, deleteVitalGroup, responseSend)

// router.get('/user/:id', staffMiddleware ,getVitalGroupByUserId)

module.exports = router