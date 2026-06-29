const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary Database
let users = [];
let posts = [];
let products = [];
let wallet = {};
let ads = [];

// Home
app.get("/", (req, res) => {
  res.send("စျေးကွက် Social API Running 🚀");
});

// Register
app.post("/register", (req, res) => {
  users.push(req.body);
  res.json({
    success: true,
    message: "User registered",
    users
  });
});

// Login
app.post("/login", (req, res) => {
  res.json({
    success: true,
    message: "Login success"
  });
});

// Posts
app.post("/post", (req, res) => {
  posts.push(req.body);
  res.json({
    success: true,
    posts
  });
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

// Marketplace
app.post("/product", (req, res) => {
  products.push(req.body);
  res.json({
    success: true,
    products
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

// Wallet
app.post("/wallet/add", (req, res) => {
  const { user, amount } = req.body;

  if (!wallet[user]) wallet[user] = 0;

  wallet[user] += Number(amount);

  res.json({
    balance: wallet[user]
  });
});

app.get("/wallet/:user", (req, res) => {
  res.json({
    balance: wallet[req.params.user] || 0
  });
});

// Ads
app.post("/ads", (req, res) => {
  ads.push(req.body);
  res.json({
    success: true,
    ads
  });
});

app.get("/ads", (req, res) => {
  res.json(ads);
});

// AI Bot
app.post("/ai", (req, res) => {
  const q = req.body.q || "";

  let answer = "မသိပါ";

  if (q.includes("wallet")) answer = "Wallet ထဲမှာ ငွေကို ကြည့်နိုင်ပါတယ်";
  if (q.includes("sell")) answer = "Marketplace မှာ ပစ္စည်းရောင်းနိုင်ပါတယ်";
  if (q.includes("earn")) answer = "Video, Share, Marketplace နဲ့ ဝင်ငွေရနိုင်ပါတယ်";

  res.json({ answer });
});

// Admin
app.get("/admin", (req, res) => {
  res.json({
    users,
    posts,
    products,
    wallet,
    ads
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
