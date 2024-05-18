const router = require("express").Router()
const {getNbsuChiefComplaintTrans, getNbsuChiefComplaintTransById, addNbsuChiefComplaintTrans, updateNbsuChiefComplaintTrans, deleteNbsuChiefComplaintTrans, deleteAllNbsuChiefComplaintTransType} = require("../controllers/nbsuChiefComplaintCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getNbsuChiefComplaintTrans, responseSend)


router.get('/user/:id', sellerUserMiddleware, getNbsuChiefComplaintTrans, responseSend)

router.get('/:id', staffMiddleware, getNbsuChiefComplaintTransById, responseSend)

router.post('/add', sellerUserMiddleware, addNbsuChiefComplaintTrans, responseSend)

router.put('/update/:id', staffMiddleware, updateNbsuChiefComplaintTrans, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteNbsuChiefComplaintTrans, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllNbsuChiefComplaintTransType, responseSend)

module.exports = router