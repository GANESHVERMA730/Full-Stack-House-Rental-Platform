if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express"); //Import Express
const app = express(); //Create app
const mongoose = require("mongoose"); //Import Mongoose
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; //MongoDB URL define
const dburl = process.env.ATLASDB_URL;

// DB CONNECT
async function main() {
  await mongoose.connect(dburl);
  console.log("connect to DB");
}
main().catch(err => console.log(err))

// VIEW SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Route create
// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// use static serialize and deserialize of model for passport session support
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "bibek-verma",
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


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