const router = require("express").Router()

const {getLegalStatus, getLegalStatusById, addLegalStatus, updateLegalStatus, deleteLegalStatus} = require("../../controllers/client/legalStatusCtrl")

router.get('/', getLegalStatus)

router.get('/:id', getLegalStatusById)

router.post('/addLegalStatus', addLegalStatus)

router.put('/updateLegalStatus/:id', updateLegalStatus)

router.delete('/deleteLegalStatus/:id', deleteLegalStatus)

module.exports = router