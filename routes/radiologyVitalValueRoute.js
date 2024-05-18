const router = require("express").Router()
const {getRadiologyVitalValue, getRadiologyVitalValueById, addRadiologyVitalValue, updateRadiologyVitalValue, deleteRadiologyVitalValue, deleteAllRadiologyVitalValue} = require("../controllers/radiologyVitalValueCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getRadiologyVitalValue, responseSend)

router.post('/public/get', verifyToken, getRadiologyVitalValue, responseSend)

router.post('/public/getBySeller', sellerUserMiddleware, getRadiologyVitalValue, responseSend)

router.get('/:id', staffMiddleware, getRadiologyVitalValueById, responseSend)

router.post('/add', sellerUserMiddleware, addRadiologyVitalValue, responseSend)

router.post('/public/addBySeller', sellerUserMiddleware, addRadiologyVitalValue, responseSend)

router.put('/update/:id', staffMiddleware, updateRadiologyVitalValue, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteRadiologyVitalValue, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllRadiologyVitalValue, responseSend)

module.exports = router