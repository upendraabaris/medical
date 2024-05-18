const router = require("express").Router()
const {getPackageType, getPackageTypeById, addPackageType, updatePackageType, deletePackageType, deleteAllPackageType} = require("../controllers/packageTypeCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")
/*  */
router.get('/', staffMiddleware, getPackageType, responseSend)

router.get('/public', /* verifyToken, */ getPackageType, responseSend)

router.get('/:id', staffMiddleware, getPackageTypeById, responseSend)

router.post('/add', staffMiddleware, addPackageType, responseSend)

router.put('/update/:id', staffMiddleware, updatePackageType, responseSend)

router.delete('/delete/:id', staffMiddleware, deletePackageType, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllPackageType, responseSend)

module.exports = router