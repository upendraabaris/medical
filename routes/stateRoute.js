const router = require("express").Router()
const {getState, getStateById, addState, updateState, deleteState} = require("../controllers/stateCtrl")

router.get('/',  getState)

router.get('/:id', getStateById)

router.post('/addState', addState)

router.put('/updatState/:id', updateState)

router.delete('/deleteState/:id', deleteState)

module.exports = router