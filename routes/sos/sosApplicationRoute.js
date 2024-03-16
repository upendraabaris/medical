const router = require("express").Router()

const {getSosApplicationForm, getSosApplicationFormById, addSosApplicationForm, updateSosApplicationForm, deleteSosApplicationForm} = require("../../controllers/sos/sosApplicationFormCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getSosApplicationForm, responseSend)

router.get('/:id', getSosApplicationFormById, responseSend)

router.post('/addSosApplicationForm', addSosApplicationForm, responseSend)

router.put('/updateSosApplicationForm/:id', updateSosApplicationForm, responseSend)

router.delete('/deleteSosApplicationForm/:id', deleteSosApplicationForm, responseSend)

module.exports = router