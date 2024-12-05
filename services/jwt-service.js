import jwt from "jsonwebtoken";
import CustomError from "../utils/errors/CustomError.js";
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Ensure the token is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new CustomError("Access denied! No token Provided", 401));
  }

  const token = authHeader.split(" ")[1];

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next(new CustomError("Token expired or invalid", 403));
    }
    // Attach user data to the request
    req.user_id = user.id;
    next();
  });
}

export default {
  generateToken,
  verifyToken
};
