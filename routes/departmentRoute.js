const router = require("express").Router()
const {getDepartment, getDepartmentById, addDepartment, updateDepartment, deleteDepartment} = require("../controllers/departmentCtrl")

const {responseSend} = require("../utils/response")

router.get('/', getDepartment, responseSend)

router.get('/:id', getDepartmentById, responseSend)

router.post('/addDepartment', addDepartment, responseSend)

router.put('/updateDepartment/:id', updateDepartment, responseSend)

router.delete('/deleteDepartment/:id', deleteDepartment, responseSend)

module.exports = router