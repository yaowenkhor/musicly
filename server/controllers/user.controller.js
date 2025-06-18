import User from "../models/user.model.js";
import { generateToken, generateRefreshToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      return res
        .status(400)
        .json({ message: `${field} '${value}' already exists` });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({
        auth: false,
        message: "Invalid email or password, please try again",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        auth: false,
        message: "Invalid email or password, please try again",
      });
    }

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
  });

  res.status(200).json({ message: "User logout sucessfully" });
};

export const getProfile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User does not found" });
    }

    res.status(200).json({ message: "User are authenticated", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
//me
export const user = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({success: false, message: "No refresh token is found" });
  }

  try {
    jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid or expired access token" });
      }

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({success: true ,user, accessToken });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something is wrong, server error", error: error });
  }
};
