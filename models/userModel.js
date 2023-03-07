const mongoose = require("mongoose");

const usrSchema = new mongoose.Schema({
    u: { type: String },
    p: { type: String },
    balance: { type: Number, default: 0 },
    gotInvited: { type: Boolean, default: false }
});

const usrModel = mongoose.model("updb",usrSchema);

module.exports = usrModel;