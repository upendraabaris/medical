const router = require("express").Router()

const {getChiefComplaint, getChiefComplaintById, addChiefComplaint, updateChiefComplaint, deleteChiefComplaint} = require("../controllers/chiefComplaintCtrl")

const {responseSend} = require("../utils/response")

router.get('/', getChiefComplaint, responseSend)

router.get('/:id', getChiefComplaintById, responseSend)

router.post('/addChiefComplaint', addChiefComplaint, responseSend)

router.put('/updateChiefComplaint/:id', updateChiefComplaint, responseSend)

router.delete('/deleteChiefComplaint/:id', deleteChiefComplaint, responseSend)

module.exports = router