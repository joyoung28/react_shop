const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");
const { response } = require("express");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!User) {
      return res.json({
        loginSuccess: false,
        message: "없는 이메일입니다.",
      });
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    }
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  //아이디를 찾아서 토큰을 지워준다.
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
