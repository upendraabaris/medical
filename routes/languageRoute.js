const router = require("express").Router()
const {getLanguage, getLanguageById, addLanguage, updateLanguage, deleteLanguage} = require("../controllers/languageCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")

router.get('/', staffMiddleware, getLanguage, responseSend)

router.get('/:id', staffMiddleware, getLanguageById, responseSend)

router.post('/addLanguage',  addLanguage, responseSend)

router.put('/updateLanguage/:id', staffMiddleware, updateLanguage, responseSend)

router.delete('/deleteLanguage/:id', staffMiddleware, deleteLanguage, responseSend)

module.exports = router