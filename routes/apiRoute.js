const router = require("express").Router()

const {getApi, getApiById, addApi, updateApi, deleteApi, deleteAllApi} = require("../controllers/apiCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getApi, responseSend)

router.get('/:id', staffMiddleware, getApiById, responseSend)

router.post('/addApi', staffMiddleware, addApi, responseSend)

router.put('/updateApi/:id', staffMiddleware, updateApi, responseSend)

router.delete('/deleteApi/:id', staffMiddleware, deleteApi, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllApi, responseSend)

module.exports = router