const router = require("express").Router()
const {getState, getStateById, addState, updateState, deleteState} = require("../controllers/stateCtrl")
const {responseSend} = require("../utils/response")

router.get('/',  getState, responseSend)

router.get('/:id', getStateById, responseSend)

router.post('/addState', addState, responseSend)

router.put('/updatState/:id', updateState, responseSend)

router.delete('/deleteState/:id', deleteState, responseSend)

module.exports = router