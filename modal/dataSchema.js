const mongoose = require('mongoose');

// Schema creation 

const PhoneBookSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
})

// model creation 


const PhoneBook = mongoose.model('datas',PhoneBookSchema)

module.exports = PhoneBook