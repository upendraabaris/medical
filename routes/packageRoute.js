const router = require("express").Router()
const {getPackage, getPackageById, addPackage, updatePackage, deletePackage, getPackageByType} = require("../controllers/packageCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")
/*  */
router.get('/', /* staffMiddleware, */ getPackage, responseSend)

router.get('/public', /* verifyToken, */ getPackage, responseSend)

router.get('/type/public/:id', verifyToken, getPackageByType, responseSend)

router.get('/:id', staffMiddleware, getPackageById, responseSend)

router.post('/addPackage', /* staffMiddleware, */ addPackage, responseSend)

router.put('/updatePackage/:id', staffMiddleware, updatePackage, responseSend)

router.delete('/deletePackage/:id', staffMiddleware, deletePackage, responseSend)

// router.delete('/deleteAll/:id', staffMiddleware, deleteAllPackage, responseSend)

module.exports = router