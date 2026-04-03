const express = require("express"); //Import Express
const app = express(); //Create app
const mongoose = require("mongoose"); //Import Mongoose
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Route create
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My farm house",
//     description: "river view point",
//     price: 1200,
//     location: "kathmandu, Nepal",
//     country: "Nepal",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.use((req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});

// Error handling:
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Error aa gya vosadi!!" } = err;
  res.render("error.ejs", { message });
  // res.status(statusCode).send(message);
});


// Server start
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});