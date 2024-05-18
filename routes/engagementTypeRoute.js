const router = require("express").Router()
const {getEngagementType, getEngagementTypeById, addEngagementType, updateEngagementType, deleteEngagementType} = require("../controllers/engagementTypeCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getEngagementType, responseSend)

router.get('/:id', staffMiddleware, getEngagementTypeById, responseSend)

router.post('/addEngagementType', staffMiddleware, addEngagementType, responseSend)

router.put('/updateEngagementType/:id', staffMiddleware, updateEngagementType, responseSend)

router.delete('/deleteEngagementType/:id', staffMiddleware, deleteEngagementType, responseSend)

module.exports = router