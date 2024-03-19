const router = require("express").Router()

const {getApi, getApiById, addApi, updateApi, deleteApi} = require("../controllers/apiCtrl")

const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getApi, responseSend)

router.get('/:id', verifyToken, getApiById, responseSend)

router.post('/addApi', verifyToken, addApi, responseSend)

router.put('/updateApi/:id', verifyToken, updateApi, responseSend)

router.delete('/deleteApi/:id', verifyToken, deleteApi, responseSend)

module.exports = router