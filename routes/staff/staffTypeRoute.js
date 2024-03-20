const router = require("express").Router()

const {getStaffType, getStaffTypeById, addStaffType, updateStaffType, deleteStaffType} = require("../../controllers/staff/staffTypeCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getStaffType, responseSend)

router.get('/:id', verifyToken, getStaffTypeById, responseSend)

router.post('/addStaffType', verifyToken, addStaffType, responseSend)

router.put('/updateStaffType/:id', verifyToken, updateStaffType, responseSend)

router.delete('/deleteStaffType/:id', verifyToken, deleteStaffType, responseSend)

module.exports = router