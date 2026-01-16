const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// View products
router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.send("Database Error");

    let html = `<h2>Products</h2><ul>`;

    rows.forEach(p => {
      html += `
        <li>
          ${p.name} - $${p.price}
          <form method="POST" action="/products/add-to-cart" style="display:inline;">
            <input type="hidden" name="id" value="${p.id}">
            <input type="hidden" name="name" value="${p.name}">
            <input type="hidden" name="price" value="${p.price}">
            <button>Add to Cart</button>
          </form>
        </li>
      `;
    });

    html += `</ul><br><a href="/cart">Go to Cart</a>`;
    res.send(html);
  });
});

// Add to cart
router.post("/add-to-cart", auth, (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }

  req.session.cart.push({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price
  });

  res.redirect("/products");
});

module.exports = router;
