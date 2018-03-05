const express = require("express");
var router = express.Router();
var Srijan = require("../models/Srijan");
var Concetto = require("../models/Concetto");
var Basant = require("../models/Basant");
var Comment = require("../models/Comment");



//==========
// HOMEPAGES
//==========


router.get("/", (req, res)=>{
    res.render("home");
});



// SRIJAN 

router.get("/srijan", (req, res) => {
    Srijan.find({}, (err, srijan) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("srijan", { srijan: srijan });

        }
    });

});

// Concetto

router.get("/concetto", (req, res) => {
    Concetto.find({}, (err, concetto) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("concetto", { concetto: concetto });

        }
    });

});


// Basant

router.get("/basant", (req, res) => {
    Basant.find({}, (err, basant) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("basant", { basant: basant });

        }
    });

});


// ==================================
// ADDING NEW ELEMENTS TO THE DATABASE
// ==================================


// NEW SRIJAN
router.get("/srijan/new", isLoggedIn, (req, res) => {
    res.render("newSrijan");
});

// NEW CONCETTO
router.get("/concetto/new", isLoggedIn, (req, res) => {
    res.render("newConcetto");
});


// NEW BASANT
router.get("/basant/new", isLoggedIn, (req, res) => {
    res.render("newBasant");
});

//===============================
// POST REQUESTS TO EVENT PAGES
//===============================


//SRIJAN AFTER POST REQUEST

router.post("/srijan", isLoggedIn,  (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var videoId = req.body.videoId;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var srijan = { name: name, videoId: videoId, description: description, author: author};
    Srijan.create(srijan, (err, newsrijan) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/srijan");
        }
    });

});


//CONCETTO AFTER POST REQUEST

router.post("/concetto", isLoggedIn, (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var videoId = req.body.videoId;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var concetto = { name: name, videoId: videoId, description: description, author: author};
    Concetto.create(concetto, (err, newconcett) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/concetto");
        }
    });

});

//BASANT AFTER POST REQUEST

router.post("/basant", isLoggedIn,  (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var videoId = req.body.videoId;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var basant = { name: name, videoId: videoId, description: description, author:author};
    Basant.create(basant, (err, newbasant) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/basant");
        }
    });

});

// SRIJAN WITH AN ID

router.get("/srijan/:id", (req, res) => {
    var id = req.params.id;
    Srijan.findById(id).populate("comments").exec((err, srijan) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("showSrijan", { srijan: srijan });
        }
    });
});


// CONCETTO WITH AN ID

router.get("/concetto/:id", (req, res) => {
    var id = req.params.id;
    Concetto.findById(id).populate("comments").exec((err, concetto) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("showConcetto", { concetto: concetto });
        }
    });
});

// BASANT WITH AN ID

router.get("/basant/:id", (req, res) => {
    var id = req.params.id;
    Basant.findById(id).populate("comments").exec((err, basant) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("showBasant", { basant: basant });
        }
    });
});


// FOR EDITTING OF SRIJAN

router.get("/srijan/:id/edit", isLoggedIn, (req, res) => {
    Srijan.findById(req.params.id, (err, srijan) => {
        if (err) {
            res.redirect("/srijan");
        }
        else {
            res.render("editSrijan", { srijan: srijan });
        }
    });
});

// FOR UPDATING OF SRIJAN

router.put("/srijan/:id", isLoggedIn, (req, res) => {
    Srijan.findByIdAndUpdate(req.params.id, req.body.srijan, (err, srijan) => {
        if (err) {
            res.redirect("/srijan");
        }
        else {
            res.redirect("/srijan/" + req.params.id);
        }
    })
})

//For deleting the SRIJAN

router.delete("/srijan/:id", isLoggedIn, (req, res) => {
    Srijan.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/srijan');
        }
        else {
            res.redirect('/srijan');
        }
    })
})


// FOR EDITTING OF CONCETTO

router.get("/concetto/:id/edit", isLoggedIn, (req, res) => {
    Concetto.findById(req.params.id, (err, concetto) => {
        if (err) {
            res.redirect("/concetto");
        }
        else {
            res.render("editConcetto", { concetto: concetto });
        }
    });
});

// FOR UPDATING OF CONCETTO

router.put("/concetto/:id", isLoggedIn, (req, res) => {
    Concetto.findByIdAndUpdate(req.params.id, req.body.concetto, (err, concetto) => {
        if (err) {
            res.redirect("/concetto");
        }
        else {
            res.redirect("/concetto/" + req.params.id);
        }
    })
})

//For deleting the CONCETTO

router.delete("/concetto/:id", isLoggedIn, (req, res) => {
    Concetto.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/concetto');
        }
        else {
            res.redirect('/concetto');
        }
    })
})


// FOR EDITTING OF BASANT

router.get("/basant/:id/edit", isLoggedIn, (req, res) => {
    Basant.findById(req.params.id, (err, basant) => {
        if (err) {
            res.redirect("/basant");
        }
        else {
            res.render("editBasant", { basant: basant });
        }
    });
});

// FOR UPDATING OF BASANT

router.put("/basant/:id", isLoggedIn, (req, res) => {
    Basant.findByIdAndUpdate(req.params.id, req.body.basant, (err, basant) => {
        if (err) {
            res.redirect("/basant");
        }
        else {
            res.redirect("/basant/" + req.params.id);
        }
    })
})

//For deleting the BASANT

router.delete("/basant/:id", isLoggedIn, (req, res) => {
    Basant.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/basant');
        }
        else {
            res.redirect('/basant');
        }
    })
})



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;