const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, isauthor } = require("../middleware.js");
const { validatereview } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

// Review route to get a whole list of reviews
router.post(
  "/",
  isLoggedIn,
  validatereview,
  wrapAsync(reviewController.createReview)
);

// to delte a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isauthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
