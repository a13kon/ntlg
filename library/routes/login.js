const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');


router.use(passport.initialize());
router.use(passport.session());

const verify = (username, password, done) => {
    db.users.findByUsername(username, (err, user) => {
        if (err) { return done(err) };
        if (!user) { return done(null, false) };
        if(!db.users.verifyPassword(user, password)) 
        {
            return done(null, false) 
        };

        return done(null, user);
    })
};

const options = {
    usernameField: "username", 
    passwordField: "password",
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    db.users.findById(id, (err, user) => {
        if (err) { return cb(err) }
        cb(null, user);
    })
});

router.get('/',  (req, res) => {
    console.log("req.user: ", req.user);
    res.render('home', { user: req.user });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/user/login' }),
    (req, res) => {
        console.log("req.user: ", req.user);
        res.redirect('/user');
});

router.get('/logout', (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect('/user');
    });
    
});

router.get('/me', 
    (req, res, next) => {
        if( !req.isAuthenticated() ) {
            return res.redirect('/user/login')
        }
        next();
    },
    (req, res) => {
        res.render('profile', {
            user: req.user
        })
});

router.get('/signup', (req, res, next) =>{
    res.render('signup');
});

module.exports = router;