const mongoose = require("mongoose");
const MONGODB_URI = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected !!");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed !!", error);
  });
