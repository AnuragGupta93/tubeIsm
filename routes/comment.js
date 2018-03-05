const express = require("express");
var router = express.Router();
var Srijan = require("../models/Srijan");
var Concetto = require("../models/Concetto");
var Basant = require("../models/Basant");
var Comment = require("../models/Comment");
var User = require("../models/User");


// COMMENTS ON SRIJAN
router.get("/srijan/:id/comments/new", isLoggedIn, (req, res) => {
    Srijan.findById(req.params.id, (err, srijan) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/newSrijan", { srijan: srijan });
        }
    });

});


router.post("/srijan/:id/comments", isLoggedIn, (req, res) => {
    Srijan.findById(req.params.id, (err, srijan) => {
        if (err) {
            res.redirect("/srijan");
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                }
                else {
                    //adding username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // saving the comment
                    comment.save();
                    srijan.comments.push(comment);
                    srijan.save();
                    res.redirect("/srijan/" + srijan._id);
                }
            });
        }
    });
});

// COMMENTS ON CONCETTO
router.get("/concetto/:id/comments/new", isLoggedIn, (req, res) => {
    Concetto.findById(req.params.id, (err, concetto) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/newConcetto", { concetto: concetto });
        }
    });

});


router.post("/concetto/:id/comments", isLoggedIn, (req, res) => {
    Concetto.findById(req.params.id, (err, concetto) => {
        if (err) {
            res.redirect("/concetto");
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                }
                else {
                    //adding username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // saving the comment
                    comment.save();
                    concetto.comments.push(comment);
                    concetto.save();
                    res.redirect("/concetto/" + concetto._id);
                }
            });
        }
    });
});

// COMMENTS ON BASANT
router.get("/basant/:id/comments/new", isLoggedIn, (req, res) => {
    Basant.findById(req.params.id, (err, basant) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/newBasant", { basant: basant });
        }
    });

});


router.post("/basant/:id/comments", isLoggedIn, (req, res) => {
    Basant.findById(req.params.id, (err, basant) => {
        if (err) {
            res.redirect("/basant");
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                }
                else {
                    //adding username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // saving the comment
                    comment.save();
                    basant.comments.push(comment);
                    basant.save();
                    res.redirect("/basant/" + basant._id);
                }
            });
        }
    });
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
