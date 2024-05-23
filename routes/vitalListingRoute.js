const router = require("express").Router()
const {getVitalListing, getVitalListingById, addVitalListing, updateVitalListing, deleteVitalListing, addData, deleteAllVitalListing } = require("../controllers/vitalListingCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getVitalListing, responseSend)

router.get('/public', getVitalListing, responseSend)

router.get('/:id', staffMiddleware, getVitalListingById, responseSend)

router.post('/add', staffMiddleware, addVitalListing, responseSend)

// router.post('/public/add', verifyToken, addVitalListing, responseSend)

router.put('/update/:id', staffMiddleware, updateVitalListing, responseSend)

router.delete('/delete/:id', staffMiddleware, deleteVitalListing, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllVitalListing, responseSend)

// router.post('/addData', addData)

module.exports = router