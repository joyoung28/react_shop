const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/key");
const { response } = require("express");
const cookieParser = require("cookie-parser");

//application/x-www-form-urlencoded 형식으로 된것을 분석
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 형식으로 된것을 분석
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
