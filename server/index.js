const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "cafe-db",
});

app.listen(3001, () => {
  console.log("listening...");
});

app.post("/save", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const isNewsletterChecked = req.body.isNewsletterChecked;
  const isAgreed = req.body.isAgreed;

  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(password);
  console.log(isNewsletterChecked);
  console.log(isAgreed);

  const query =
    "INSERT INTO users (firstName, lastName, email, password, getNewsletter) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [firstName, lastName, email, password, isNewsletterChecked],
    (err, result) => {
      if (err) return res.json(err);
      else return res.json(result);
    }
  );
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Internal server error" });

    if (result.length === 0)
      return res.status(401).json({ message: "Invalid username or password!" });

    res.status(200).json({ message: "Sign in successful", user: result[0] });
  });
});
