const router = require("express").Router()
const {getState, getStateById, addState, updateState, deleteState, addData } = require("../controllers/stateCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getState, responseSend)

router.get('/public', verifyToken, getState, responseSend)

router.get('/:id', verifyToken, getStateById, responseSend)

router.post('/addState', verifyToken, addState, responseSend)

router.put('/updatState/:id', verifyToken, updateState, responseSend)

router.delete('/deleteState/:id', verifyToken, deleteState, responseSend)

// router.post('/addData', addData)

module.exports = router