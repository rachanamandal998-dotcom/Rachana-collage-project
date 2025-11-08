const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../database");

// ✅ USER REGISTER
exports.handleUserRegister = async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(403).json({ message: "Please provide name, phone and password" });
  }

  // Check if user already exists
  const existingUser = await users.findOne({ where: { phone } });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists with this phone number" });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create user
  const newUser = await users.create({
    name,
    phone,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "User registered successfully",
    data: { id: newUser.id, phone: newUser.phone },
  });
};

// ✅ USER LOGIN
exports.handleUserLogin = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(403).json({ message: "Please provide phone or password" });
  }

  const user = await users.findOne({ where: { phone } });
  if (!user) {
    return res.status(403).json({ message: "No user found" });
  }

  const isMatched = bcrypt.compareSync(password, user.password);
  if (!isMatched) {
    return res.status(403).json({ message: "Invalid phone or password" });
  }

  const token = jwt.sign({ id: user.id }, "echo", {
    expiresIn: "10d",
  });

  return res.status(200).json({
    message: "Login Successfully",
    token: token,
  });
};


// ✅ GET USER LIST WITH SERIAL NUMBER
exports.getAllUsers = async (req, res) => {
  try {
    const userList = await users.findAll({
      attributes: ["name", "phone"], // select only required fields
      order: [["id", "ASC"]], // keeps order consistent
    });

    const formattedUsers = userList.map((user, index) => ({
      s_n: index + 1,  // serial number starts from 1
      name: user.name,
      phone: user.phone,
    }));

    return res.status(200).json({
      message: "Users fetched successfully",
      data: formattedUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
