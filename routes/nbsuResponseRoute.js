const router = require("express").Router()
const {getNbsuResponse, getNbsuResponseById, addNbsuResponse, updateNbsuResponse, deleteNbsuResponse} = require("../controllers/nbsuResponseCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, sellerUserMiddleware} = require("../middleware/authMiddleware")

router.get('/', sellerUserMiddleware, getNbsuResponse, responseSend)

router.get('/:id', staffMiddleware, getNbsuResponseById, responseSend)

router.post('/add', /* staffMiddleware, */ addNbsuResponse, responseSend)

router.put('/update/:id', staffMiddleware, updateNbsuResponse, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteNbsuResponse, responseSend)

module.exports = router