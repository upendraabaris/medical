const router = require("express").Router()
const {getFavoriteContact, getFavoriteContactById, addFavoriteContact, updateFavoriteContact, deleteFavoriteContact} = require("../controllers/favoriteContactCtrl")
const {responseSend} = require("../utils/response")

router.get('/', getFavoriteContact, responseSend)

router.get('/:id', getFavoriteContactById, responseSend)

router.post('/addFavoriteContact', addFavoriteContact, responseSend)

router.put('/updateFavoriteContact/:id', updateFavoriteContact, responseSend)

router.delete('/deleteFavoriteContact/:id', deleteFavoriteContact, responseSend)

module.exports = router