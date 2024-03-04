const router = require("express").Router()

const {getSos, getSosById, addSos, updateSos, deleteSos} = require("../../controllers/sos/sosCtrl")

router.get('/', getSos)

router.get('/:id', getSosById)

router.post('/addSos', addSos)

router.put('/updateSos/:id', updateSos)

router.delete('/deleteSos/:id', deleteSos)

module.exports = router