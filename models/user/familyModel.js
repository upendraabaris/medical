const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
    relation_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'userrelation', required: true, index:true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index:true },
    relative_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index:true },
    isPermitted: { type: Boolean, required: true, index:true }
})

module.exports = mongoose.model("familyMember", familyMemberSchema)