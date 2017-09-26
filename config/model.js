/* Mongoose Models Configuration File */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

/* User Model */
var user = mongoose.model('User', new Schema({
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

/*C reditRequest Model */
var creditRequest = mongoose.model('CreditRequest', new Schema({
    requestedBy:{
        type: Object,
        required: true
    },
    requestedAt: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: Number,
        required: [true, 'Amount is Required']
    },
    repaymentDate: {
        type: Date,
        required: [true, 'Repayment Date is Required']
    },
    isRepaymentDone: {
        type: Boolean,
        default: false
    }
}));

module.exports.User = user;
module.exports.CreditRequest = creditRequest;
