const mongoose = require("mongoose");

// remote mongodb
// mongodb+srv://etaipassword:etaipassword@feedbackdb.d8kfkvp.mongodb.net/?retryWrites=true&w=majority

// local mongodb connect
// const connect = () => {
//     mongoose.connect("mongodb://127.0.0.1:27017").then(() => { console.log("DB connection successful"); }).catch(() => { console.log("Db failed to Connect"); });
// }

// remote mongodb connect
const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb+srv://etaipassword:etaipassword@feedbackdb.d8kfkvp.mongodb.net/?retryWrites=true&w=majority").then(() => { console.log("DB connection successful"); }).catch(() => { console.log("Db failed to Connect"); });
}



module.exports = connect;
