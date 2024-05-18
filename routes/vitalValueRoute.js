const router = require("express").Router()
const {getVitalValue, getVitalValueById, addVitalValue, updateVitalValue, deleteVitalValue, addData, deleteAllVitalValue } = require("../controllers/vitalValueCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getVitalValue, responseSend)

router.post('/public/get', verifyToken, getVitalValue, responseSend)

// router.get('/public', getVitalValue, responseSend)

router.get('/:id', staffMiddleware, getVitalValueById, responseSend)

router.post('/add', /* staffMiddleware, */ addVitalValue, responseSend)

router.post('/public/add', verifyToken, addVitalValue, responseSend)

router.post('/public/addBySeller', sellerUserMiddleware, addVitalValue, responseSend)

router.post('/public/getBySeller', sellerUserMiddleware, getVitalValue, responseSend)

// router.post('/public/add', verifyToken, addVitalValue, responseSend)

router.put('/update/:id', staffMiddleware, updateVitalValue, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteVitalValue, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllVitalValue, responseSend)

// router.post('/addData', addData)

module.exports = router