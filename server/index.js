let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let passport = require("passport");
let expressSession = require("express-session");
let passportLocal = require("passport-local");
let passportLocalMongoose = require("passport-local-mongoose");
const app = express();
const UserModel = require("./models/Data.js").UserModel;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    expressSession({
        secret: "The secret Code!",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const URL =
    "mongodb+srv://bhupesh8222:bhupesh8222@cluster0.pd8xh.mongodb.net/Healthcare?retryWrites=true&w=majority";
//const URL = "mongodb://localhost:27017/Record";
mongoose
    .connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((res) => {
        console.log("Connected to Database!");
    })
    .catch((error) => {
        console.log(error);
    });

// ROUTES ADD
const patientRoute = require(__dirname + "/routes/patientRoute.js");
const hospitalRoute = require(__dirname + "/routes/hospitalRoute.js");
const authenticationRoute = require(__dirname +
    "/routes/authenticationRoute.js");

app.use("/patient", patientRoute);
app.use("/hospital", hospitalRoute);
app.use(authenticationRoute);

app.listen(3000, () => {
    console.log("The server is listening to the request!");
});