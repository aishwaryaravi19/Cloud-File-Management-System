const mongoose=require('mongoose');

const FileSchema=new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    cloudfrontKey: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileDesc: {
        type: String,
        required: true
    },
    modifiedDate: {
        type: Date, 
        default: Date.now
    },
    uploadTime: {
        type: String,
        required: true
    }

});

const Files=mongoose.model('files',FileSchema);

module.exports = Files;