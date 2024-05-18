const router = require("express").Router()

const {getStaff, getStaffById, addStaff, updateStaff, deleteStaff, loginStaffByMobile, getStaffStats, loginStaffByAdmin} = require("../../controllers/staff/staffCtrl")

const {responseSend} = require("../../utils/response")

const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getStaff, responseSend)

router.get('/:id', staffMiddleware, getStaffById, responseSend)

router.post('/addStaff', /* staffMiddleware, */ addStaff, responseSend)

router.put('/updateStaff/:id', staffMiddleware, updateStaff, responseSend)

router.delete('/deleteStaff/:id', staffMiddleware, deleteStaff, responseSend)

router.post('/login', loginStaffByMobile, responseSend)

router.post('/login/admin', loginStaffByAdmin, responseSend)

router.get('/admin/staff-status', getStaffStats, responseSend)

module.exports = router