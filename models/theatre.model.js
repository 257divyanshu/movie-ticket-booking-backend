const mongoose = require('mongoose');
/**
 * Defines the schema of theatre resource to be stored in the db
 */

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String, // no validations for description
    city: { // using object because validations are required
        type: String,
        required: true
    },
    pincode: {
        tpye: Number,
        required: true
    },
    address: String // no validations for address
}, {timestamps: true});

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;