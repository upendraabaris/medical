const router = require("express").Router()
const {getVitalCategory, getVitalCategoryById, addVitalCategory, updateVitalCategory, deleteVitalCategory, addData, deleteAllVitalCategory } = require("../controllers/vitalCategoryCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getVitalCategory, responseSend)

router.get('/public', getVitalCategory, responseSend)

router.get('/:id', staffMiddleware, getVitalCategoryById, responseSend)

router.post('/addVitalCategory', staffMiddleware, addVitalCategory, responseSend)

router.put('/updatVitalCategory/:id', staffMiddleware, updateVitalCategory, responseSend)

router.delete('/deleteVitalCategory/:id', staffMiddleware, deleteVitalCategory, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllVitalCategory, responseSend)

// router.post('/addData', addData)

module.exports = router