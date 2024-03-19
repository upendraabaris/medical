const router = require("express").Router()

const {getAward, getAwardById, addAward, updateAward, deleteAward} = require("../controllers/awardCtrl")

const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getAward, responseSend)

router.get('/:id', verifyToken,  getAwardById, responseSend)

router.post('/addAward', verifyToken, addAward, responseSend)

router.put('/updateAward/:id', verifyToken, updateAward, responseSend)

router.delete('/deleteAward/:id', verifyToken, deleteAward, responseSend)

module.exports = router