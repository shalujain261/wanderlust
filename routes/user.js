const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirect } = require("../middleware");
const userController = require("../controllers/user");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.createUserForSignup));

router
  .route("/login")
  .get(userController.renderLoginFrom)
  .post(
    saveRedirect,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.createLoggedInUser
  );

router.get("/logout", userController.logOutUser);

module.exports = router;
