const router = require("express").Router()

const {getEmrResponse, getEmrResponseById, addEmrResponse, updateEmrResponse, deleteEmrResponse} = require("../../controllers/emr/emrResponseCtrl")

router.get('/', getEmrResponse)

router.get('/:id', getEmrResponseById)

router.post('/addEmrResponse', addEmrResponse)

router.put('/updateEmrResponse/:id', updateEmrResponse)

router.delete('/deleteEmrResponse/:id', deleteEmrResponse)

module.exports = router