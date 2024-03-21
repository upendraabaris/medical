const router = require("express").Router()
const {getDepartment, getDepartmentById, addDepartment, updateDepartment, deleteDepartment} = require("../controllers/departmentCtrl")

const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getDepartment, responseSend)

router.get('/:id', staffMiddleware, getDepartmentById, responseSend)

router.post('/addDepartment', staffMiddleware, addDepartment, responseSend)

router.put('/updateDepartment/:id', staffMiddleware, updateDepartment, responseSend)

router.delete('/deleteDepartment/:id', staffMiddleware, deleteDepartment, responseSend)

module.exports = router