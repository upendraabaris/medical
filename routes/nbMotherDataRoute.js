const router = require("express").Router()
const {getNbMotherData, getNbMotherDataById, addNbMotherData, updateNbMotherData, deleteNbMotherData, addNbMotherDataDuringLabour} = require("../controllers/nbMotherDataCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/user/:id', sellerUserMiddleware, getNbMotherDataById, responseSend)

// router.get('/', staffMiddleware, getNbMotherData, responseSend)

router.post('/add', sellerUserMiddleware, addNbMotherData, responseSend)

// router.put('/add/duringlabour/:id', sellerUserMiddleware, addNbMotherDataDuringLabour, responseSend)

router.put('/update/:id', sellerUserMiddleware, updateNbMotherData, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteNbMotherData, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllNbMotherDataType, responseSend)

module.exports = router