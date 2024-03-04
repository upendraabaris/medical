const router = require("express").Router()

const {getChiefComplaint, getChiefComplaintById, addChiefComplaint, updateChiefComplaint, deleteChiefComplaint} = require("../controllers/chiefComplaintCtrl")

router.get('/', getChiefComplaint)

router.get('/:id', getChiefComplaintById)

router.post('/addChiefComplaint', addChiefComplaint)

router.put('/updateChiefComplaint/:id', updateChiefComplaint)

router.delete('/deleteChiefComplaint/:id', deleteChiefComplaint)

module.exports = router