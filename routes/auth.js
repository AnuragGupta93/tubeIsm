const express = require("express");
var router = express.Router();
var User = require("../models/User");
var passport = require("passport");


// Auth
// FOR REGISTRATION
router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/");
        });
    });
});

// FOR LOGIN

router.get("/login", (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), (req, res) => {

});

// For logout

router.get("/logout", (req, res) => {
    console.log("logout");
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
