const router = require("express").Router()

const {getStaffType, getStaffTypeById, addStaffType, updateStaffType, deleteStaffType} = require("../../controllers/staff/staffTypeCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getStaffType, responseSend)

router.get('/:id', staffMiddleware, getStaffTypeById, responseSend)

router.post('/addStaffType', staffMiddleware, addStaffType, responseSend)

router.put('/updateStaffType/:id', staffMiddleware, updateStaffType, responseSend)

router.delete('/deleteStaffType/:id', staffMiddleware, deleteStaffType, responseSend)

module.exports = router