const Listing = require("../models/listing");
const axios = require("axios");
const { uploadToCloudinary } = require("../cloudConfig.js");

module.exports.index = async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", {
    allListings,
    activeCategory: category || null,
    searchQuery: null,
  });
};

module.exports.searchListings = async (req, res) => {
  const q = req.query.q ? req.query.q.trim() : "";
  if (!q) return res.redirect("/listings");
  const regex = new RegExp(q, "i");
  const allListings = await Listing.find({
    $or: [{ title: regex }, { location: regex }, { country: regex }],
  });
  res.render("listings/index.ejs", { allListings, searchQuery: q, activeCategory: null });
};

module.exports.renderNewform = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "The listing you requested does not exist.");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

const geocode = async (location) => {
  const response = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: { q: location, format: "json", limit: 1 },
    headers: { "User-Agent": "wanderlust-app (contact@wanderlust.com)" },
  });
  return response.data[0] || null;
};

module.exports.createListings = async (req, res) => {
  try {
    const { location } = req.body.listing;

    const geoData = await geocode(location);
    if (!geoData) {
      req.flash("error", "Location not found. Please enter a valid location.");
      return res.redirect("/listings/new");
    }

    const { url, filename } = await uploadToCloudinary(req.file.buffer, req.file.mimetype);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = {
      type: "Point",
      coordinates: [parseFloat(geoData.lon), parseFloat(geoData.lat)],
    };
    await newListing.save();

    req.flash("success", "New listing created!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.error("Error creating listing:", err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/listings/new");
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    const { location } = req.body.listing;

    const geoData = await geocode(location);
    if (!geoData) {
      req.flash("error", "Location not found. Please enter a valid location.");
      return res.redirect(`/listings/${id}/edit`);
    }

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    listing.geometry = {
      type: "Point",
      coordinates: [parseFloat(geoData.lon), parseFloat(geoData.lat)],
    };

    if (req.file) {
      const { url, filename } = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
      listing.image = { url, filename };
    }

    await listing.save();
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error updating listing:", err);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect(`/listings/${req.params.id}/edit`);
  }
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted.");
  res.redirect("/listings");
};