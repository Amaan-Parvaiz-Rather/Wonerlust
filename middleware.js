const Listing = require("./models/listing");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log(req.session.returnTo);
    req.flash("error", "You must be signed in first!");
    return res.redirect("/signup");
  }
  next();
};

module.exports.savedURL = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

// middleware for validating the data
// This middleware will be called before creating a new post and updating a post
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // validate the data using Joi
  // console.log(error.details[0].message);
  if (error) {
    // check if the data is valid or not
    throw new ExpressError(400, error);
  } else {
    next();
  }
  // if valid, go to next middleware
};

// middleware for validating the data
// This middleware will be called before creating a new post and updating a post
module.exports.validatereview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  // validate the data using Joi
  // console.log(error.details[0].message);
  if (error) {
    // check if the data is valid or not
    throw new ExpressError(400, error);
  } else {
    next();
  }
  // if valid, go to next middleware
};

module.exports.isauthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the author of the review!");
    return res.redirect(`/listing/${id}`);
  }
  next();
};
