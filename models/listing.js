const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "http://naturalbeauty83.blogspot.com/2014/12/natural-beauty.html",
    set: (v) => v === "" ? "http://naturalbeauty83.blogspot.com/2014/12/natural-beauty.html" : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;