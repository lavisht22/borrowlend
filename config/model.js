var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is Required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique:{
            value: true,
            message: 'Email already taken'}
    },
    password: {
        type: String,
        required: true
    },
    creditLimit: Number,
    createDate:{
        type: Date,
        default: Date.now()
    },
    role:{
        type: String,
        enum: ['borrower', 'lender']
    }
}));

module.exports = User;