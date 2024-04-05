const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected: ${connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  connectToDB,
};
