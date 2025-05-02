const User = require("../models/user");

// Function to render the signup page
module.exports.renderSignin = (req, res) => {
  res.render("users/signup.ejs");
};

// Function to create a new account
module.exports.createAccount = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wonderlust!");

      res.redirect(res.locals.returnTo || "/listing");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Function to render the login page
module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

// Function to handle login
module.exports.login = async (req, res, next) => {
  req.flash("success", "Welcome back to Wonderelust!");
  console.log("login:" + res.locals.returnTo);
  res.redirect(res.locals.returnTo || "/listing");
};

// Function to handle logout
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out successfully!");
    res.redirect("/listing");
  });
};
