const express = require("express"); //Import Express
const app = express(); //Create app
const mongoose = require("mongoose"); //Import Mongoose
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; //MongoDB URL define

// Database connect
main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Route create
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My farm house",
    description: "river view point",
    price: 1200,
    location: "kathmandu, Nepal",
    country: "Nepal",
  });

  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful testing");
});

// Server start
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});