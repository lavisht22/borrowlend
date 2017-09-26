var express = require('express');
var router = express.Router();
var passport = require('passport')

var CreditRequest = require('../config/model').CreditRequest;
var User = require('../config/model').User;

/* Route to create a new borrow requests for this user */
router.post('/borrower/createrequest', passport.authenticate('borrower-jwt', { session: false }), function(req, res) {
    var amount = req.body.amount;
    var repaymentDate = req.body.repaymentdate;
    var request = new CreditRequest();
    request.requestedBy = {name: req.user.firstName + " " + req.user.lastName, email: req.user.email};
    request.amount = req.body.amount;
    request.repaymentDate = dateFromString(repaymentDate);
    request.save(function(err){
        if(err){
            res.status(500).json(err);
        }
        else{
            var newLimit = req.user.creditLimit - amount;
            User.findOneAndUpdate({'email': req.user.email}, {creditLimit: newLimit}, function(err, data){
                if(err){
                    res.status(500).json(err);
                }
                else{
                    res.status(200).json({'message': "Request Submitted Successfully!"});
                }
            });
        }
    });
});

/* route to view all the requests submitted by the user */
router.get('/borrower/viewrequests', passport.authenticate('borrower-jwt', {session: false}), function(req, res){
    CreditRequest.find({'requestedBy.email':req.user.email}, function(err, data){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.json(data);
        }
    });
});

/* route to view all the requests, can only be accessed by the lender */
router.get('/lender/viewrequests', passport.authenticate('lender-jwt', {session: false}), function(req, res){
    CreditRequest.find(function(err, data){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(data);
        }
    });
});

/* route to get all the borrowers available in the system */
router.get('/lender/viewborrowers', passport.authenticate('lender-jwt', {session: false}), function(req, res){
    User.find({'role':"borrower"}, function(err, data){
        if(err){
            res.status(500).json(err);
        }
        else{
            for(var i = 0; i < data.length; i++){
                var temp = data[i];
                temp.password = undefined;
                temp.role = undefined;
            }
            res.status(200).json(data);
        }
    });
});

/* route to mark a payment as complete */
router.put('/lender/payment', passport.authenticate('lender-jwt', {session: false}), function(req, res){
    var id = req.body.id;
    if(id){
        CreditRequest.findOneAndUpdate({'_id':id}, {'isRepaymentDone':true}, function(err){
            if(err){
                res.status(500).json(err);
            }
            else{
                res.status(200).json({'message': "Record Updated Successfully!"});
            }
        });
    }
    else{
        res.status(401).json({'message': "ID Required"});
    }
});

function dateFromString(str){
// str format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var dt   = parseInt(str.substring(0,2));
    var mon  = parseInt(str.substring(3,5));
    var yr   = parseInt(str.substring(6,10));
    var date = new Date(yr, mon-1, dt+1);
    return date;
}

module.exports = router;
