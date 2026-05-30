import {
  registerUser,
  loginUser,
} from "../services/authService.js";

export async function register(req, res) {
  try {
    const newUser = await registerUser(
      req.body.username,
      req.body.password
    );

    res.status(201).json({
      message: "Register berhasil",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const token = await loginUser(
      req.body.username,
      req.body.password
    );

    res.json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}