const router = require("express").Router()
const {getProcedure, getProcedureById, addProcedure, updateProcedure, deleteProcedure} = require("../controllers/procedureCtrl")
const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getProcedure, responseSend)

router.get('/:id', verifyToken, getProcedureById, responseSend)

router.post('/addProcedure', verifyToken, addProcedure, responseSend)

router.put('/updateProcedure/:id', verifyToken, updateProcedure, responseSend)

router.delete('/deleteProcedure/:id', verifyToken, deleteProcedure, responseSend)

module.exports = router