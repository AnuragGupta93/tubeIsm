const    
                  express = require("express"),
                      app = express(),
           methodOverride = require("method-override"),
               bodyParser = require("body-parser"),
                 mongoose = require("mongoose"),
              Srijan = require("./models/Srijan"),
              Basant = require("./models/Basant"),
              Concetto = require("./models/Concetto"),
                  Comment = require("./models/Comment"),
                     User = require("./models/User"),
                 passport = require("passport"),
            passportLocal = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
 

// CONNECTING TO MONGOOSE

app.use(express.static("public"));
mongoose.connect("mongodb://localhost/tube_ism");




// // ROUTES LOCATION

var commentRoutes = require("./routes/comment.js");
var  authRoutes = require("./routes/auth.js");
var  eventRoutes = require("./routes/event.js");


// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Once again this is a secret key",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//USING DIFFERENT NPM MODULES

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


// USING ROUTES

app.use(eventRoutes);
app.use(authRoutes);
app.use(commentRoutes);



// STARTING SERVER ON CLOUD 9
app.listen(process.env.PORT, process.env.ID, () => {
    console.log("tubeISM is working");
});