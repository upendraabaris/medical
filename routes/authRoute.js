const router = require("express").Router()
const { login } = require("../controllers/authCtrl")

router.post('/login', login)

module.exports = router