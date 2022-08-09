//const passport = require('passport');

const express = require("express");
const router = express.Router();

const Login = require('./login');
const Signup = require('./signup');
const Profile = require('./profile');
const Logout = require('./logout');

var csrf=require('csurf'); //Session token
var csrfProtection=csrf({cookie: false});
router.use(csrfProtection);


router.get("/login", Login.loginGET);
router.post("/login", Login.loginPOST);
router.get("/signup", Signup.signupGET);
router.post("/signup", Signup.SignupPOST);
router.get("/profile", Profile.ProfileGET);
router.get("/logout", Logout.LogoutGET);

module.exports = router;

