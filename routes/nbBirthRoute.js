const router = require("express").Router()
const {getNbBirthData, getNbBirthDataById, addNbBirthData, updateNbBirthData, deleteNbBirthData} = require("../controllers/nbBirthCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', sellerUserMiddleware, getNbBirthData, responseSend)


// router.get('/user/:id', /* sellerUserMiddleware, */ getNbBirthDataById, responseSend)

router.post('/add', sellerUserMiddleware, addNbBirthData, responseSend)

router.put('/update/:id', sellerUserMiddleware, updateNbBirthData, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteNbBirthData, responseSend)

router.get('/user/:id', /* sellerUserMiddleware, */ getNbBirthData, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllNbBirthDataType, responseSend)

module.exports = router