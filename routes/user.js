const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn } = require("../middleware.js");
const { savedURL } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignin)
  .post(savedURL, wrapAsync(userController.createAccount));

router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    savedURL,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// Route for handling logout
router.get("/logout", isLoggedIn, userController.logout);

module.exports = router;
