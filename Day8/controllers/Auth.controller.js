import userModel from "../models/user.schema.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.password !== password) {
      return res.status(401).send("Invalid credentials");
    } else {
      res.status(200).send("Login successful");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = userModel({
      name: name,
      email: email,
      password: password,
    });

    console.log("New User Created:", newUser);

    const isUserExist = await userModel.findOne({ email: email });
    if (isUserExist) {
      return res.status(400).send("User already exists with this email");
    }

    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export { Login, Register };
