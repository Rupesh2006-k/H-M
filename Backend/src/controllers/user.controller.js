let UserModel = require("../models/user.model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");


let register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5h",
    });

    res.cookie("token", token);

    return res.status(201).send({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};
const currentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  res.status(200).json({
    success: true,
    user: req.user
  });
};

let login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Find user
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Create JWT
    let token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5h" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 5 * 60 * 60 * 1000, // 5 hours
    });

    // User without password
   

    return res.status(200).send({
      message: "User logged in successfully",
      user
    });

  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};

let logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).send({
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
};


module.exports = { register ,login, logout ,currentUser};
