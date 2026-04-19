require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
const ownerID = process.argv[2];

if (!ownerID) {
  console.error("Usage: node init/index.js <ownerUserId>");
  console.error("Example: node init/index.js 64abc123def456ghi789jkl0");
  process.exit(1);
}

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const seedData = initData.data.map((obj) => ({ ...obj, owner: ownerID }));
  await Listing.insertMany(seedData);
  console.log(`Database seeded with ${seedData.length} listings (owner: ${ownerID})`);
  mongoose.connection.close();
};

initDB();
