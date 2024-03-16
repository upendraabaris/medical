const mongoose = require('mongoose')

const userRelationSchema = new mongoose.Schema({
//   relationtypeid: { type: Number, required: true, unique: true, index: true },
  relationtype: { type: String, required: true,enum: ['Spouse', 'Parents', 'Siblings', 'Children', 'Family', 'Friend', 'Neighbor'] },
})

module.exports = mongoose.model('UserRelation', userRelationSchema)
