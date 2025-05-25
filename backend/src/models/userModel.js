const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
        
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
   age:{
    type:Number,
    required: true,
    min: 0
    

   },
   address:{
    type:String,
    required: true,
    trim: true

   },
});

module.exports = mongoose.model('users', userSchema);