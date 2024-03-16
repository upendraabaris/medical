const router = require("express").Router()
const {getProcedure, getProcedureById, addProcedure, updateProcedure, deleteProcedure} = require("../controllers/procedureCtrl")
const {responseSend} = require("../utils/response")

router.get('/', getProcedure, responseSend)

router.get('/:id', getProcedureById, responseSend)

router.post('/addProcedure', addProcedure, responseSend)

router.put('/updateProcedure/:id', updateProcedure, responseSend)

router.delete('/deleteProcedure/:id', deleteProcedure, responseSend)

module.exports = router