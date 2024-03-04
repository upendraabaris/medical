const router = require("express").Router()

const {getEmr, getEmrById, addEmr, updateEmr, deleteEmr} = require("../../controllers/emr/emrCtrl")

router.get('/', getEmr)

router.get('/:id', getEmrById)

router.post('/addEmr', addEmr)

router.put('/updateEmr/:id', updateEmr)

router.delete('/deleteEmr/:id', deleteEmr)

module.exports = router