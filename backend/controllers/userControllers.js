const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//register users
const createUser = asyncHandler(async (req, res) => {
  
  console.log(req.file);
  const {
    firstname,
    lastname,
    age,
    email,
    salary,
    country,
    state,
    city,
    document,
    password,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !age ||
    !email ||
    !salary ||
    !country ||
    !state ||
    !city ||
    !document ||
    !password
  ) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    firstname,
    lastname,
    age,
    email,
    salary,
    country,
    state,
    city,
    document,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
      salary: user.salary,
      country: user.country,
      state: user.state,
      city: user.city,
      document: user.document,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

//autherize user
/*const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res
      .json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: generateToken(user._id),
      })
      .status(200);
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
*/


//update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        salary: req.body.salary,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        document: req.body.document,
      },
    }
  );

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
      salary: user.salary,
      country: user.country,
      state: user.state,
      city: user.city,
      document: user.document,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Update the User");
  }
};

//get users
const getUsers = async (req, res) => {
  const search = req.query.search || "";
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = 4;

  const query = {
    $or: [
      { firstname: { $regex: search, $options: "i" } },
      { lastname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  try {
    const skip = (page - 1) * ITEM_PER_PAGE;

    const count = await User.countDocuments(query);
    // console.log(count)

    const usersdata = await User.find(query).limit(ITEM_PER_PAGE).skip(skip);

    const pageCount = Math.ceil(count/ITEM_PER_PAGE);
    res.status(200).json({
      pagination:{
        count, pageCount
      },
      usersdata});
  } catch (error) {
    res.status(401).json(error);
  }
};

//get one users
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userdata = await User.findOne({ _id: id });
    res.status(200).json(userdata);
  } catch (error) {
    res.status(401).json(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  createUser,
  // authUser,
  updateUser,
  getUsers,
  getSingleUser,
  deleteUser,
};