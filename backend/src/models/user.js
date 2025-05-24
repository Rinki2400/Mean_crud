const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        // unique: true,
        // trim: true,
        // minlength: 3
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
        // trim: true,
        // lowercase: true
    },
    password: {
        type: String,
        // required: true,
        // minlength: 6
    },
   age:{
    type:Number,

   },
   address:{
    type:String,
   },
});

module.exports = mongoose.model('users', userSchema);