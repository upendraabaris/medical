const router = require("express").Router()

const {getAward, getAwardById, addAward, updateAward, deleteAward} = require("../controllers/awardCtrl")

const {responseSend} = require("../utils/response")

router.get('/', getAward, responseSend)

router.get('/:id', getAwardById, responseSend)

router.post('/addAward', addAward, responseSend)

router.put('/updateAward/:id', updateAward, responseSend)

router.delete('/deleteAward/:id', deleteAward, responseSend)

module.exports = router