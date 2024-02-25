const mongoose = require("mongoose");
const db = process.env.DB;
mongoose
  .connect(`mongodb://127.0.0.1:27017/${db}`)
  .then(() => console.log("connected"))
  .catch((err) => console.log("not connected", err));
