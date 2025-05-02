const express = require("express");
const app = express();
const session = require("express-session");
var flash = require("connect-flash");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
const sessionOptions = {
  secret: "mysupersecretkey",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.msg = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { username = "anonymous" } = req.query;
  req.session.username = username;

  if (username === "anonymous") {
    req.flash("error", "I am an error message!");
  } else {
    req.flash("success", "I am a flash message!");
  }
  res.redirect("/welcome");
});

app.get("/welcome", (req, res) => {
  res.render("page.ejs", { username: req.session.username });
});

// app.get("/reqcount", (req, res) => {
//   if (req.session.reqcount) {
//     req.session.reqcount++;
//   } else {
//     req.session.reqcount = 1;
//   }
//   res.send(`Request is send ${req.session.reqcount} times`);
// });

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
