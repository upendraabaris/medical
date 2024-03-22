const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
  referring_user_id: { type: Number, required: true },
  parent_client_id: { type: Number },
  client_name: { type: String },
  legal_status_id: { type: mongoose.Schema.Types.ObjectId, ref: "LegalStatus" },
  client_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "ClientType" },
},
{
  timestamps: true,
})

module.exports = mongoose.model('client', clientSchema)