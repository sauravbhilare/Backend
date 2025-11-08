import userModel from "../model/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("DATA", req.body);

    // Add return statements!
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required", success: false });
    }

    const isUserExist = await userModel.findOne({ email: email });
    if (!isUserExist) {
      return res.status(400).json({
        message: "User does not exist with this email",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid Password", success: false });
    }

    const token = jwt.sign({ userId: isUserExist._id }, process.env.APP_TOKEN);
    console.log("token", token);

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "Login Successful",
      success: true,
      user: { name: isUserExist.name, userId: isUserExist._id },
    });
  } catch (error) {
    console.log("Error in Login Route:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email: email });
    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log("encryptedPassword", encryptedPassword);
    const newUser = userModel({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log("Error in Register Route:", error);
    res.status(500).json("Internal Server Error");
  }
};

const getUser = async (req, res) => {
  try {
    const isUserExist = await userModel.findById(req.userId);
    if (!isUserExist) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: { name: isUserExist.name, userId: isUserExist._id },
    });
  } catch (error) {
    console.log("Error in getUser Route:", error);
    res.status(500).json("Internal Server Error");
  }
};

export { Login, Register, getUser };
