const router = require("express").Router()

const {getEmr, getEmrById, addEmr, updateEmr, deleteEmr} = require("../../controllers/emr/emrCtrl")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getEmr)

router.get('/:id', verifyToken, getEmrById)

router.post('/addEmr', verifyToken, addEmr)

router.put('/updateEmr/:id', verifyToken, updateEmr)

router.delete('/deleteEmr/:id', verifyToken, deleteEmr)

module.exports = router