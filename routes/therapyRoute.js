const router = require("express").Router()
const {getTherapy, getTherapyById, addTherapy, updateTherapy, deleteTherapy} = require("../controllers/therapyCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', sellerUserMiddleware, getTherapy, responseSend)

router.get('/:id', staffMiddleware, getTherapyById, responseSend)

router.post('/add', staffMiddleware, addTherapy, responseSend)

router.put('/update/:id', staffMiddleware, updateTherapy, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteTherapy, responseSend)

module.exports = router