const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');



router.use(passport.initialize());
router.use(passport.session());


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async function(username, password, done){

    try{
        const user = await User.findOne({username: username});
        if (!user) {return done(null, false)}
        if (password === user.password) {return done(null, user)}
        else {return done (null, false)};

    } catch (e) {
        return done(e);
    };

})); 

passport.serializeUser(function(user,done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try{
        const user = await User.findById(id);
        return done(null, user);
    } catch (e) {
        return done(e);
    };

});


router.get('/',  (req, res) => {
    res.render('home', { 
        user: req.user,
        title: "Авторизация", 
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Авторизация", 
    });
});

router.post('/login', 
    passport.authenticate('local', {failureRedirect: '/user/login'}),
    (req, res) => {
        res.redirect('/user');
    });

        

router.get('/logout', (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect('/user');
    });
    
});

router.post('/signup', async (req, res, next) => {
    let alreadyEx = await User.findOne({username: req.body.username});
    if (!alreadyEx) {
        try{
            let newUser = new User({username: req.body.username, password: req.body.password});
            newUser.save();
            res.redirect('/user/me');
        } catch (e) {
            res.json(e);
        }
    } else {
        res.redirect('/user/signup');
    }
        
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
            user: req.user,
            title: "Авторизация", 
        })
});

router.get('/signup', (req, res, next) =>{
    res.render('signup', {
        title: "Авторизация", 
    });
});

module.exports = router;