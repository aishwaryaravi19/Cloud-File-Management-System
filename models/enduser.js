const mongoose=require('mongoose');

const EndUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
    level: {
        type: String,
        required: true
    }

});

const EndUser=mongoose.model('EndUser',EndUserSchema);

module.exports = EndUser;