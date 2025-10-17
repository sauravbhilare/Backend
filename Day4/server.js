import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

let user = {};

app.get("/", (req, res) => {
  console.log(process.env.App_Token, "process.env.App_Token");
  res.send("Hello Express");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send("Please Enter Email and Password");
  }

  if (user[email]) {
    if (user[email] === password) {
      res.send("user already exists");
    } else {
      res.send("Password not matching for the existing user");
    }
  }

  user = { ...user, [email]: password };
  res.send("User registered successfully");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
