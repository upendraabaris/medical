const router = require("express").Router()
const {getLanguage, getLanguageById, addLanguage, updateLanguage, deleteLanguage, deleteAllLanguage, countryLanguageMapping, getCountryLanguageMapping, getLanguageMultiple, addMapping, getDataByCountryId, stateLanguageMapping, getStateLanguageMappingByStateId, getstateLanguageMapping} = require("../controllers/languageCtrl")
const {responseSend} = require("../utils/response")

// const {verifyToken} = require("../middleware/authMiddleware")
const {staffMiddleware} = require("../middleware/authMiddleware")


router.get('/', /* staffMiddleware, */ getLanguage, responseSend)
router.get('/getCountryLanguageMapping/:id', getCountryLanguageMapping, responseSend)

router.post('/addLanguage',  addLanguage, responseSend)

router.put('/updateLanguage/:id', /* staffMiddleware, */ updateLanguage, responseSend)

router.delete('/deleteLanguage/:id', staffMiddleware, deleteLanguage, responseSend)

router.delete('/deleteAll/:id', staffMiddleware, deleteAllLanguage, responseSend)

router.post('/countryLanguageMapping', countryLanguageMapping, responseSend)

router.post('/addmapping', addMapping, responseSend)    //For Regional Mapping

router.get('/getRegionalmapping/:id', getDataByCountryId, responseSend)     // For Regional Mapping

router.post('/stateLanguageMapping/add', stateLanguageMapping, responseSend)

router.get('/stateLanguageMapping/:state_id', getStateLanguageMappingByStateId, responseSend)

router.get('/getstateLanguageMapping', getstateLanguageMapping, responseSend)

router.get('/:id', staffMiddleware, getLanguageById, responseSend)
module.exports = router