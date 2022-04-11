const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Mission = require("../models/missionModel");

// @desc    GET all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    GET user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    DELETE user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  // console.log(req);
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, userName, password, role, departement } = req.body;

  if (!name || !userName || !password || !role) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    userName,
    password,
    role,
    departement,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      userName: user.userName,
      isAdmin: user.isAdmin,
      role: user.role,
      departement: user.departement,
      token: generateToken(user._id, user.userName),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  // console.log(req);
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  // Check for user userName
  const user = await User.findOne({ userName });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      userName: user.userName,
      isAdmin: user.isAdmin,
      role: user.role,
      departement: user.departement,
      token: generateToken(user._id, user.userName),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      userName: user.userName,
      isAdmin: user.isAdmin,
      role: user.role,
      departement: user.departement,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    UPDATE user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.userName = req.body.userName || user.userName;
    user.role = req.body.role || user.role;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      userName: updatedUser.userName,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
      token: generateToken(updatedUser._id, updatedUser.userName),
    });
  } else {
    res.status(401);
    throw new Error("User not found ");
  }
});

const getMission = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("mission");
  res.status(200).json(user.mission);
});

// @desc    add mission
// @route   POST /api/users/:id/mission
// @access  Private

const addMission = asyncHandler(async (req, res) => {
  if (!req.body.nom) {
    res.status(400);
    throw new Error("Please add a nom field");
  }
  if (!req.body.nomAgent) {
    res.status(400);
    throw new Error("Please add a nomAgent field");
  }
  if (!req.body.matricule) {
    res.status(400);
    throw new Error("Please add a matricule field");
  }
  if (!req.body.dateDeMission) {
    res.status(400);
    throw new Error("Please add a dateDeMission field");
  }
  if (!req.body.destination) {
    res.status(400);
    throw new Error("Please add a destination field");
  }
  // Create a new car
  const newMission = new Mission(req.body);

  // Get user
  const user = await User.findById(req.params.id);

  // Assing a user as a mission user
  newMission.user = user;

  // save the car
  await newMission.save();

  // Add mission to the user's mission array
  user.mission.push(newMission);

  // save the user
  await user.save();

  res.status(201).json(newMission);
});

// Generate JWT
const generateToken = (id, userName) => {
  return jwt.sign({ id, userName }, process.env.JWT_SECRET, {
    expiresIn: "360d",
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getMe,
  deleteUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
  addMission,
  getMission,
};
