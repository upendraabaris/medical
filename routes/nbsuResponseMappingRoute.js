const router = require("express").Router()
const {getNbsuResponseMapping, getNbsuResponseMappingById, addNbsuResponseMapping, updateNbsuResponseMapping, deleteNbsuResponseMapping} = require("../controllers/nbsuResponseMappingCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* sellerUserMiddleware, */ getNbsuResponseMapping, responseSend)

router.get('/:id', staffMiddleware, getNbsuResponseMappingById, responseSend)

router.post('/add', /* staffMiddleware, */ addNbsuResponseMapping, responseSend)

router.put('/update/:id', staffMiddleware, updateNbsuResponseMapping, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteNbsuResponseMapping, responseSend)

module.exports = router