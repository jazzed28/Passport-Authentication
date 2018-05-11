var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User');

var userController = {};

// Restrict accesss to root page
userController.home = (req, res) => {
    res.render('index', { user: req.user });
};

// Go to registration page
userController.register = (req, res) => {
    res.render('register');
};

// Post registration
userController.doRegister = (req, res) => {
    User.register(new User({ username: req.body.username, name: req.body.name }),
                req.body.password, (err, user) => {
                    if(err) {
                        return res.render('register', { user: uesr });
                    }

                    passport.authenticate('local')(req, res, () => {
                        res.redirect('/');
                    });
                });
};

// Go to login page
userController.login = (req, res) => {
    res.render('login');
}

// Post login
userController.doLogin = (req, res) => {
    passport.authenticate('local')(req, res, () => {
        res.redirect('/');
    })
}

// Logout
userController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = userController;