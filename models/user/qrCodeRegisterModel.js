const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
//   qrcodeid: { type: Number, required: true, unique: true, index: true },
  qrcodeimage: { type: Buffer, required: true, index:true },
});

module.exports = mongoose.model('QRCode', qrCodeSchema);