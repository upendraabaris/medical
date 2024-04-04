const router = require("express").Router()

const {getAward, getAwardById, addAward, updateAward, deleteAward, deleteAllAward} = require("../controllers/awardCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getAward, responseSend)

router.get('/:id', staffMiddleware,  getAwardById, responseSend)

router.post('/addAward', /* staffMiddleware, */ addAward, responseSend)

router.put('/updateAward/:id', /* staffMiddleware, */ updateAward, responseSend)

router.delete('/deleteAward/:id', staffMiddleware, deleteAward, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllAward, responseSend)

module.exports = router