const express = require("express");
const mongoose = require("mongoose");
const Registeruser = require("./model");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const cors = require("cors");
const app = express();
const Msgmodel = require("./Msgmodel");

mongoose
  .connect(
    "mongodb+srv://karthik:karthik@cluster0.yf34isx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db connect");
  })
  .catch((err) => console.log(err));
app.use(express.json());

app.use(cors({ origin: "*" }));

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exist Please login" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "PassWord Not Matching" });
    }
    let newUser = new Registeruser({
      username,
      email,
      password,
      confirmpassword,
    });
    await newUser.save();
    res.status(200).send("Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internel Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (!exist) {
    alert("User not Found ")
      return res.status(400).json({ message: "User Not Found Please Register" });
      
    }
    if (exist.password !== password) {
      return res.status(400).json({ message: "Password Incorrect" });
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.get("/myprofile", middleware, async (req, res) => {
  try {
    let exist = await Registeruser.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("User not found");
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});
app.post("/addmsg", middleware, async (req, res) => {
  try {
    const { text } = req.body;
    const exist = await Registeruser.findById(req.user.id);
    let newmsg = new Msgmodel({
      user: req.user.id,
      username: exist.username,
      text,
    });
    await newmsg.save();
    let allmsg = await Msgmodel.find();
    return res.json(allmsg);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});
app.get("/getmsg", middleware, async (req, res) => {
  try {
    let allmsg = await Msgmodel.find();
    return res.json(allmsg);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});
app.listen(5000, () => {
  console.log("Server running...");
});
