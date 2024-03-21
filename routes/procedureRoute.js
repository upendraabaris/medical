const router = require("express").Router()
const {getProcedure, getProcedureById, addProcedure, updateProcedure, deleteProcedure} = require("../controllers/procedureCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getProcedure, responseSend)

router.get('/:id', staffMiddleware, getProcedureById, responseSend)

router.post('/addProcedure', staffMiddleware, addProcedure, responseSend)

router.put('/updateProcedure/:id', staffMiddleware, updateProcedure, responseSend)

router.delete('/deleteProcedure/:id', staffMiddleware, deleteProcedure, responseSend)

module.exports = router