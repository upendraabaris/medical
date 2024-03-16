const router = require("express").Router()

const {getSos, getSosById, addSos, updateSos, deleteSos} = require("../../controllers/sos/sosCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getSos, responseSend)

router.get('/:id', getSosById, responseSend)

router.post('/addSos', addSos, responseSend)

router.put('/updateSos/:id', updateSos, responseSend)

router.delete('/deleteSos/:id', deleteSos, responseSend)

module.exports = router