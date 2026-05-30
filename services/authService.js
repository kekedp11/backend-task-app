import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function registerUser(username, password) {
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error("Username sudah dipakai");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  return await newUser.save();
}

export async function loginUser(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Password salah");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return token;
}