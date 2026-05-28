const mongoose = require('mongoose');
/**
 * Defines the schema of theatre resource to be stored in the db
 */

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    description: String, // no validations for description
    city: { // using object because validations are required
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String, // no validations for address
    movies: {
        type: [mongoose.Schema.Types.ObjectId], // type is 'array of object ids'
        ref: 'Movie' // referencing the 'Movie' collection
    }
}, { timestamps: true });

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;