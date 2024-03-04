const router = require("express").Router()

const {getAward, getAwardById, addAward, updateAward, deleteAward} = require("../controllers/awardCtrl")

router.get('/', getAward)

router.get('/:id', getAwardById)

router.post('/addAward', addAward)

router.put('/updateAward/:id', updateAward)

router.delete('/deleteAward/:id', deleteAward)

module.exports = router