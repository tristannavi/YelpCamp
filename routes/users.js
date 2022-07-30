const express = require("express")
const router = express.Router()
const catchAsync = require("../utils/catchAsync")
const passport = require("passport")
const {renderRegisterForm, register, renderLoginForm, logoutUser, loginUser} = require("../controllers/users")

router.route("/register")
    .get(renderRegisterForm)
    .post(catchAsync(register))


router.get("/logout", logoutUser)

router.route("/login")
    .get(renderLoginForm)
    .post(passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
        keepSessionInfo: true //Insecure, https://www.youtube.com/watch?v=i0q8YCCffoM
        //https://github.com/nax3t/YelpCamp-Updates-2022/compare/returnTo
    }), loginUser)

module.exports = router