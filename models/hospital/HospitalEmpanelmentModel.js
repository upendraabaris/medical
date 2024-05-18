const mongoose = require('mongoose');

const hospitalEmpanelmentMasterSchema = new mongoose.Schema({
    name: { type: String }
});

module.exports = mongoose.model('HospitalEmpanelmentMaster', hospitalEmpanelmentMasterSchema);
