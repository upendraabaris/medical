const router = require("express").Router()

const {getEmrOption, getEmrOptionById, addEmrOption, updateEmrOption, deleteEmrOption} = require("../../controllers/emr/emrOptionCtrl")

router.get('/', getEmrOption)

router.get('/:id', getEmrOptionById)

router.post('/addEmrOption', addEmrOption)

router.put('/updateEmrOption/:id', updateEmrOption)

router.delete('/deleteEmrOption/:id', deleteEmrOption)

module.exports = router