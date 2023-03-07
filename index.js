const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const homeRouter = require("./routes/homeRouter");
const cookieParser = require("cookie-parser");
const dbConnect= require("./connectionDb");

dbConnect();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static("public"));

app.use(homeRouter);



app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});

