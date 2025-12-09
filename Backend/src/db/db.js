let mongoose = require("mongoose");

let connectDB = async () => {
  try {
    let res = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    return res;
  } catch (err) {
    console.log("MongoDB connection failed");
  }
};

module.exports = connectDB;
