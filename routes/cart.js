const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, (req, res) => {
  const cart = req.session.cart || [];

  let html = `<h2>Your Cart</h2><ul>`;
  let total = 0;

  cart.forEach(item => {
    html += `<li>${item.name} - $${item.price}</li>`;
    total += Number(item.price);
  });

  html += `</ul><h3>Total: $${total}</h3>`;
  html += `<a href="/products">Back to Products</a>`;

  res.send(html);
});

module.exports = router;
