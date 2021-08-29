const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmailSchema = new Schema({
name : String,
email: String,
phone: String,
message: String
});
module.exports = mongoose.model('Email', EmailSchema);