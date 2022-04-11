const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected :${conn.connection.host}`.cyan.underline);
    // mongoose.set("debug", (collectionName, method, query, doc) => {
    //   console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    // });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
