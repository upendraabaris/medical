const router = require("express").Router()
const {getHealthTip, getHealthTipById, addHealthTip, updateHealthTip, deleteHealthTip} = require("../controllers/healthTipCtrl")
const {responseSend} = require("../utils/response")

router.get('/', getHealthTip, responseSend)

router.get('/:id', getHealthTipById, responseSend)

router.post('/addHealthTip', addHealthTip, responseSend)

router.put('/updateHealthTip/:id', updateHealthTip, responseSend)

router.delete('/deleteHealthTip/:id', deleteHealthTip, responseSend)

module.exports = router