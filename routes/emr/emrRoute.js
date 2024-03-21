const router = require("express").Router()

const {getEmr, getEmrById, addEmr, updateEmr, deleteEmr, addEmrData} = require("../../controllers/emr/emrCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getEmr)

router.get('/:id', staffMiddleware, getEmrById)

router.post('/addEmr', staffMiddleware, addEmr)

router.put('/updateEmr/:id', staffMiddleware, updateEmr)

router.delete('/deleteEmr/:id', staffMiddleware, deleteEmr)

router.post('/addEmrData', addEmrData)

module.exports = router