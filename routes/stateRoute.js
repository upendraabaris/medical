const router = require("express").Router()
const {getState, getStateById, addState, updateState, deleteState, addData, deleteAllState, getStateByCountryId } = require("../controllers/stateCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', getState, responseSend)

router.get('/public', getState, responseSend)

router.get('/getState/:countryId', getStateByCountryId, responseSend)

router.get('/:id', staffMiddleware, getStateById, responseSend)

router.post('/addState', staffMiddleware, addState, responseSend)

router.put('/updatState/:id', staffMiddleware, updateState, responseSend)

router.delete('/deleteState/:id', staffMiddleware, deleteState, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllState, responseSend)

router.post('/addData', addData)

module.exports = router