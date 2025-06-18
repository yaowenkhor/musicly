import express from "express";
import jwt from "jsonwebtoken";

import { generateToken } from "../utils/jwtToken.js";

const router = express.Router();

router.get("/refreshToken", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Refresh token is expired" });
    }

    const newAccessToken = generateToken(decoded.id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken: newAccessToken, message: "Refresh Access Token is successful" });
  });
});

export default router;
