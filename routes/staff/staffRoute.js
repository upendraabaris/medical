const router = require("express").Router()

const {getStaff, getStaffById, addStaff, updateStaff, deleteStaff} = require("../../controllers/staff/staffCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getStaff, responseSend)

router.get('/:id', verifyToken, getStaffById, responseSend)

router.post('/addStaff', verifyToken, addStaff, responseSend)

router.put('/updateStaff/:id', verifyToken, updateStaff, responseSend)

router.delete('/deleteStaff/:id', verifyToken, deleteStaff, responseSend)

module.exports = router