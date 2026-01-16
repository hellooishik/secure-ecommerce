const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  db.run("INSERT INTO users(email,password,role) VALUES(?,?,?)",
    [req.body.email, hash, "user"]);
  res.redirect("/login.html");
});

router.post("/login", (req, res) => {
  db.get("SELECT * FROM users WHERE email=?", [req.body.email], async (err, user) => {
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user;
      res.redirect("/products.html");
    } else {
      res.send("Login Failed");
    }
  });
});

module.exports = router;
