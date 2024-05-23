const router = require("express").Router()
const {getNbsuTherapy, getNbsuTherapyById, addNbsuTherapy, updateNbsuTherapy, deleteNbsuTherapy} = require("../controllers/nbsuTherapiesCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* sellerUserMiddleware, */ getNbsuTherapy, responseSend)

router.get('/:id', staffMiddleware, getNbsuTherapyById, responseSend)

router.post('/add', /* staffMiddleware, */ addNbsuTherapy, responseSend)

router.put('/update/:id', staffMiddleware, updateNbsuTherapy, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteNbsuTherapy, responseSend)

module.exports = router