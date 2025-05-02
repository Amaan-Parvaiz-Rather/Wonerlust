require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = 3000;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRoutes = require("./routes/listing.js");
const rewiewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const { isLoggedIn } = require("./middleware.js");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const dbUrl = process.env.AtlasDB_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: `${process.env.SECRET}`,
  },
  touchAfter: 24 * 60 * 60, // time period in seconds 24 hours
});

store.on("error", (e) => {
  console.log("Session store error", e);
});

const sessionOptions = {
  store: store,
  secret: `${process.env.SECRET}`,
  resave: false,
  saveUninitialized: true,
  cookie: {
    express: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Calling the mongoDb main function
main()
  .then(() => {
    console.log("Connectes to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// function for Connecting to Database
async function main() {
  await mongoose.connect(dbUrl);
}

// middleware for flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success") || [];
  res.locals.error = req.flash("error") || [];
  res.locals.currentUser = req.user;
  next();
});

app.use("/listing", listingRoutes);
app.use("/listing/:id/reviews", rewiewRoutes);
app.use("/", userRoutes);

// Root rout
app.get("/", (req, res, next) => {
  res.render("listing/home.ejs");
});
// middleware for wrong routes
// This should be the last middleware in the file
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// middleware for wrong input
app.use((err, req, res, next) => {
  let { statusCode = 500, _message = "Oh no! Something went wrong!" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("listing/error.ejs", { err });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
