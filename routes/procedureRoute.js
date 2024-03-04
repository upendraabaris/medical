const router = require("express").Router()

const {getProcedure, getProcedureById, addProcedure, updateProcedure, deleteProcedure} = require("../controllers/procedureCtrl")

router.get('/', getProcedure)

router.get('/:id', getProcedureById)

router.post('/addProcedure', addProcedure)

router.put('/updateProcedure/:id', updateProcedure)

router.delete('/deleteProcedure/:id', deleteProcedure)

module.exports = router