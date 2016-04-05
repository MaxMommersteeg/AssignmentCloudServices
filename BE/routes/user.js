var express = require('express');
var router = express.Router();
var _ = require('underscore');
var jwt = require('jwt-simple');
var User;
var Config;

// routings
function signup(req, res) {
    res.setHeader('Content-Type', 'application/html');
    console.log(req.body.username);

    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err, user) {
            if (err) {
                return res.status(500).render('500.jade', {title:'500: Internal Server Error', error: 'User ' + user.username + ' already exists.'});
            } else {
                return res.status(200).render('200.jade', {title:'Success', msg: 'Successful created new user.', user: user});
            }
        });
    }
}

function authenticate(req, res) {
    res.setHeader('Content-Type', 'application/json');
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, Config.secret);
                    // return the information including token as JSON
                    res.status(200).send({success: true, token: token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
}

router.route('/signup')
    .post(signup);

router.route('/authenticate')
    .post(authenticate);

module.exports = function(mongoose, config) {
    console.log('Initializing login routing module');
    User = mongoose.model('User');
    Config = config;
    return router;
};
