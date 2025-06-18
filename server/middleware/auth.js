import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ auth: false, message: "Authentication failed" });
      } else {
        req.userId = decoded.userId;
        console.log(req.userId);
        next();
      }
    });
  }
};
