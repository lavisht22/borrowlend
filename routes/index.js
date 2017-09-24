var express = require('express');
var router = express.Router();
var User = require('../config/model');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var secret = 'cashpositivesecretkey';

//middleware to check lender while sign-up procedure
var lenderCheck = function(req, res, next){
    if(req.body.role === 'lender'){
        User.findOne({'role': "lender"}, function(err, data){
            if(err){
                res.status(500).json(err);
            }

            if(data){
                res.status(401).json({'message': "Only 1 Lender Allowed!"});
            }
            else{
              next();
            }
        });
    }
    else{
      next();
    }

}

// Signup Route
router.post('/signup', lenderCheck, function(req, res) {
  var fname = req.body.firstname;
  var lname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

    User.findOne({email: email}, function(err, data){
        if(err){
            res.status(500).json(err);
        }

        if(!data){
            bcrypt.hash(password, 10, function(err, hash){
                var newUser = new User();
                newUser.firstName = fname;
                newUser.lastName = lname;
                newUser.password = hash;
                newUser.email = email;
                newUser.role = role;
                newUser.creditLimit = 100000;
                newUser.save(function(err){
                    if(err) {
                        res.status(500).json(err.message);
                    }
                    else{
                        res.status(200).json({'message': "User Created Successfully!"});
                    }
                });
            });
        }
        else{
            res.status(401).json({'error': "Email Already Used!"});
        }
    });

});

//login route to facilitate login process
router.post('/login', function(req, res){
  var email = req.body.email;
  var password = req.body.password;

if(password) {
    User.findOne({'email': email}, function(err, data){
        if(err){
            res.status(500).json(err);
        }

        if(data){
            bcrypt.compare(password, data.password, function(err, result){
                if(err){
                    res.status(500).json(err);
                }

                if(result){
                    var payload = {email: data.email, role: data.role};
                    var token = jwt.sign(payload, secret, { expiresIn: '1h' });
                    res.status(200).json({'message': "Successful!",
                        'token': token});
                }
                else{
                    res.status(401).json({'message': "Invalid Password!"});
                }
            });
        }
        else{
            res.status(401).json({'message': 'Username Not Found'});
        }
    });
}
else{
  res.status(401).json({'message': "Password Not Entered!"});
}
});

module.exports = router;
