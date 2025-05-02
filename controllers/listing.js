const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.Map_Token;
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });
// This function is used to render the index page of the listing
module.exports.index = async (req, res) => {
  let dataList = await Listing.find({});
  res.render("listing/index.ejs", { dataList });
};

// This function is used to render the new listing page
module.exports.renderNew = (req, res) => {
  res.render("listing/new.ejs");
};

// This function is used to show the listing page
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "lising you are looking for does not exist!");
    return res.redirect("/listing");
  }
  console.log(listing);
  res.render("listing/show.ejs", {
    data: listing,
    reviews: listing.reviews,
  });
};

// This function is used to create a new listing
module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let fileName = req.file.filename;

  const listing = new Listing(req.body);
  listing.owner = req.user._id;
  listing.image = {
    url: url,
    filename: fileName,
  };
  listing.geometry = response.body.features[0].geometry;
  let newList = await listing.save();
  console.log(newList);
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listing");
};

// This function is used to render the edit page of the listing
module.exports.renderEdit = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  if (!list) {
    req.flash("error", "lising you are looking for does not exist!");
    return res.redirect("/listing");
  }
  let originalImage = list.image.url;
  originalImage = originalImage.replace("/upload", "/upload/w_400");
  res.render("listing/edit.ejs", { list, originalImage });
};

// This function is used to update the listing
module.exports.updateListing = async (req, res, next) => {
  let { title, description, location, country, price, image } = req.body;
  let { id } = req.params;
  let data = await Listing.findByIdAndUpdate(
    id,
    { description, location, country, price, image },
    { validation: true },
    { new: true }
  );
  if (typeof req.file !== "undefined") {
    // If the user uploads a new image, update the image field
    let url = req.file.path;
    let fileName = req.file.filename;
    data.image = {
      url: url,
      filename: fileName,
    };
    await data.save();
  }
  req.flash("success", "Successfully updated a new listing!");
  res.redirect("/listing");
};

// This function is used to delete the listing
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a Listing!");
  res.redirect("/listing");
};
