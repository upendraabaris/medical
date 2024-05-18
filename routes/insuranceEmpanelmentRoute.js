const router = require("express").Router()
const {getInsuranceEmpanelment, getInsuranceEmpanelmentById, addInsuranceEmpanelment, updateInsuranceEmpanelment, deleteInsuranceEmpanelment, deleteAllInsuranceEmpanelment} = require("../controllers/insuranceEmpanelmentCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getInsuranceEmpanelment, responseSend)

router.get('/:id', staffMiddleware, getInsuranceEmpanelmentById, responseSend)

router.post('/addInsuranceEmpanelment', staffMiddleware, addInsuranceEmpanelment, responseSend)

router.put('/updateInsuranceEmpanelment/:id', staffMiddleware, updateInsuranceEmpanelment, responseSend)

router.delete('/deleteInsuranceEmpanelment/:id', staffMiddleware, deleteInsuranceEmpanelment, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllInsuranceEmpanelment, responseSend)

module.exports = router