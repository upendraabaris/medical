const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    department_id: { type: Number, required: true, unique: true, index: true },
    department_name: { type: String, required: true },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Department', departmentSchema)
