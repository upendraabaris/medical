const router = require("express").Router()
const {getDepartment, getDepartmentById, addDepartment, updateDepartment, deleteDepartment} = require("../controllers/departmentCtrl")

const {responseSend} = require("../utils/response")

const {verifyToken} = require("../middleware/authMiddleware")

router.get('/', verifyToken, getDepartment, responseSend)

router.get('/:id', verifyToken, getDepartmentById, responseSend)

router.post('/addDepartment', verifyToken, addDepartment, responseSend)

router.put('/updateDepartment/:id', verifyToken, updateDepartment, responseSend)

router.delete('/deleteDepartment/:id', verifyToken, deleteDepartment, responseSend)

module.exports = router