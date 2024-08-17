const mongoose = require("mongoose");


const AddDonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: Date,
        required: true
    },
    contactNumber:{
        type : String,
        required : true
    },
    lastDonated: {
        type: Date,
        required: true
    }
});


const DonorModel = mongoose.model('Donor', AddDonorSchema);

module.exports = DonorModel;
