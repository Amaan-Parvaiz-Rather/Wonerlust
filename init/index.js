const mongoose = require("mongoose");

const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// function for Connecting to Database
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  const data = initData.map((obj) => ({
    ...obj,
    owner: "6803a3a2a8d9c02e6a58c34e",
  }));
  await Listing.insertMany(data);
  console.log("Data was initialized!");
};
initDB();
