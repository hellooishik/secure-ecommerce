const bcrypt = require("bcrypt");
const db = require("./config/db");

(async () => {
  const hash = await bcrypt.hash("admin123", 10);

  db.run(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    ["admin@test.com", hash, "admin"],
    (err) => {
      if (err) {
        console.log("Admin already exists OR error:", err.message);
      } else {
        console.log("Admin user created successfully");
      }
    }
  );
})();
