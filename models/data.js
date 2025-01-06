const mongoose = require("mongoose");
const mySchema = mongoose.Schema;

const articleSchema = new mySchema({
    username:String,
    email: String,
    password: String,
});

const Data = mongoose.model("Data", articleSchema);

module.exports = Data;
