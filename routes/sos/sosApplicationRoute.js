const router = require("express").Router()

const {getSosApplicationForm, getSosApplicationFormById, addSosApplicationForm, updateSosApplicationForm, deleteSosApplicationForm} = require("../../controllers/sos/sosApplicationFormCtrl")

router.get('/', getSosApplicationForm)

router.get('/:id', getSosApplicationFormById)

router.post('/addSosApplicationForm', addSosApplicationForm)

router.put('/updateSosApplicationForm/:id', updateSosApplicationForm)

router.delete('/deleteSosApplicationForm/:id', deleteSosApplicationForm)

module.exports = router