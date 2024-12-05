import { body, validationResult } from "express-validator";

const loginValidation = [
  // Validate username
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .notEmpty()
    .withMessage("Email is required."),
  // Validate password
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .isLength({ max: 50 })
    .withMessage("Password must not exceed 50 characters."),
];

// Error handling middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default {
  loginValidation,
  validateRequest,
};
