/*
  Author(s): Cameron Fritz,
             Justin Yin,
             Jacy Yu,
             Yi Yang
  
  Date Created: 2/29/2020
  Last Updated: 3/5/2020
  
  File: dressmeserver.js
  Purpose: Script for a Node.js server for the website dressme
*/
var storage = require('@google-cloud/storage')
let express = require("express");
let session = require("client-sessions");
const bp = require("body-parser");

let app = express();

app.use(express.static('public'));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Sets some necessary headers to allow requests to the server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Creates a session
app.use(session({
    cookieName: 'session',
    secret: 'asdfasdf23423',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

// Requirement for the login module
const login = require("./login");

// Login Endpoint
app.post("/login", function(req, res) {
    login.login(conn, req.body.user, req.body.pass, function(val) {
        if (val <= 0) {
            req.session.msg = "Invalid login";
            res.redirect("./");
        } else {
            req.session.user = req.body.user;
            res.redirect("./welcome");
        }
    });
});

// Logout endpoint - Not used yet
app.get("/logout", function(req, res) {
    req.session.reset();
    req.session.msg = "Goodbye";
    return res.redirect('/');
});

// Sends a welcome message on successful login
app.get("/welcome", function(req, res) {
    if (!req.session.user) {
        req.session.msg = 'Access Denied';
        return res.redirect('/');
    }
    res.send("Welcome" + req.session.user);
});

// Test endpoint
app.get("/test", function(req, res) {
    console.log(req.query.clothType);
    res.send("<h1>" + String(req.query.clothType) + "</h1>");
});

app.listen(8080);