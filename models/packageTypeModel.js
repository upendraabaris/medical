const mongoose = require("mongoose")

const packageTypeSchema = new mongoose.Schema({
    package_type: { type: String }
},{
    timestamps: true
})

module.exports = mongoose.model('PackageType',  packageTypeSchema)