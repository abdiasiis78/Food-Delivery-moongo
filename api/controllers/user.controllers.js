import bcryptjs from "bcryptjs";
import User from "../modules/user.module.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;

// Sign up
export const signup = async (req, res, next) => {
  try {
    const { name, email, profioleImage, password, role } = req.body;
    const isexistingUser = await User.findOne({ email });
    if (isexistingUser) {
      return res.json({
        status: 401,
        message: "user is allredy exist",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      profioleImage,
      password: hashedPassword,
      role,
    });

    if (!newUser) {
      return res.json({
        status: 400,
        message: "user was`nt created",
      });
    }

    await newUser.save();
    res.status(201).json({
      message: "User creation succsesfuly",
      newUser,
    });
  } catch (err) {
    next(err);
  }
};

// Sign In
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkedUser = await User.findOne({ email });
    if (!checkedUser) {
      return res.json({
        status: 404,
        message: "user not found",
      });
    }

    const checkedPassword = bcryptjs.compareSync(
      password,
      checkedUser.password
    );

    if (!checkedPassword) {
      return res.json({
        status: 404,
        message: "password isn't correct",
      });
    }

    const token = jwt.sign(
      { id: checkedUser._id, role: checkedUser.role },
      SECRET_JWT,
      { expiresIn: "17d" }
    );
    res.json({
      status: 200,
      message: "user loged In",
      token,
    });
  } catch (err) {
    next(err);
  }
};

// get current user

export const curentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// get all users

export const users = async (req, res, next) => {
  try {
    const allUsers = await User.find().select("-password");

    if (!allUsers) {
      return res.json({
        status: 404,
        message: "  Ussers not retreived",
      });
    }
    return res.json({
      status: 200,
      message: "  Ussers retreived successfuly",
      allUsers,
    });
  } catch (err) {
    next(err);
  }
};

// updating User
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email, profioleImage } = req.body;

    const updatingUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        name,
        email,
        profioleImage,
      }
    );
    if (!updatingUser) {
      return res
        .status(400)
        .json({ status: 400, message: "User was not updated!" });
    }
    res.status(200).json({ status: 200, message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};

// delete curent user

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userdeletions = await User.findByIdAndDelete({ _id: userId });
    if (!userdeletions) {
      return res.json({
        message: "user deletion not successfuly",
      });
    }
    return res.json({
      message: "user deleted succesfully",
    });
  } catch (err) {
    next(err);
  }
};
