const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(session({
  secret: "securekey123",
  resave: false,
  saveUninitialized: false
}));

app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/admin", require("./routes/admin"));
app.use("/cart", require("./routes/cart"));


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
