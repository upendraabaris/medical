const mongoose = require("mongoose")

const userRoleSchema = new mongoose.Schema({
    user_role: { type: String }
})

module.exports = mongoose.model('UserRole', userRoleSchema)