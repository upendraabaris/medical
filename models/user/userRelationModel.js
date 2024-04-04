const mongoose = require('mongoose')

const userRelationSchema = new mongoose.Schema({
  // relation_type_id: { type: Number, required: true, unique: true, index: true },
  relationtype: { type: String, required: true,enum: ['spouse', 'parents', 'siblings', 'children', 'family', 'friend', 'neighbor'] },
})

module.exports = mongoose.model('UserRelation', userRelationSchema)
