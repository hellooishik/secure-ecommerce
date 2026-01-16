const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/add-product", auth, role("admin"), (req, res) => {
  db.run("INSERT INTO products(name,price) VALUES(?,?)",
    [req.body.name, req.body.price]);
  res.redirect("/admin.html");
});

module.exports = router;
