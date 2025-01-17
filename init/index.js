const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listingModel.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  // await Listing.deleteMany({});
  let data = initData.data
  data = data.map((obj) => ({ ...obj, owner: "6786bd5170181f1529dbf71e" }));
  await Listing.insertMany(data);
  console.log("data was initialized");
  
};

initDB();