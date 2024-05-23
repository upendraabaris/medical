const mongoose = require('mongoose');

const ProductSupplierMappingSchema = new mongoose.Schema({
    product_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    country_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    state_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    },
    city_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    product_postalcode_mapping_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductPostalCodeMapping'//get from product postal code mapping
    },
    supplier_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers' //get from seller master
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('ProductSupplierMapping', ProductSupplierMappingSchema);
