const router = require("express").Router()

const {getDepartment, getDepartmentById, addDepartment, updateDepartment, deleteDepartment} = require("../controllers/departmentCtrl")

router.get('/', getDepartment)

router.get('/:id', getDepartmentById)

router.post('/addDepartment', addDepartment)

router.put('/updateDepartment/:id', updateDepartment)

router.delete('/deleteDepartment/:id', deleteDepartment)

module.exports = router