var express = require('express');
var router = express.Router();
var passport = require('passport')

/* Route to get borrow requests from user */
router.post('/borrower/createrequest', passport.authenticate('borrower-jwt', { session: false }), function(req, res) {
    res.send('respond with a resource');
});

/* route to view all the requests submitted by the user */
router.get('/borrower/viewrequests', passport.authenticate('borrower-jwt', {session: false}), function(req, res){
    res.json('respond!');
});


router.get('/lender/viewrequests', passport.authenticate('lender-jwt', {session: false}), function(req, res){
    res.json('respond!');
});

router.get('/lender/viewborrowers', passport.authenticate('lender-jwt', {session: false}), function(req, res){
    res.json('respond!');
});

router.put('/lender/payment', passport.authenticate('lender-jwt', {session: false}), function(req, res){
    res.json('respond!');
});




module.exports = router;
