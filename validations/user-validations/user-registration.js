import { body, validationResult } from "express-validator";

const userValidation = [
    // Validate email
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address.')
      .notEmpty()
      .withMessage('Email is required.'),
  
    // Validate password
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.')
      .isLength({ max: 50 })
      .withMessage('Password must not exceed 50 characters.')
      .notEmpty()
      .withMessage('Password is required.'),
  
    // Validate confirmPassword
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm Password is required.')
      .isLength({ min: 8 })
      .withMessage('Confirm Password must be at least 8 characters long.'),
  
    // Custom validator to check if password and confirmPassword match
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
  ];
  
  // Error handling middleware
  const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  
  export default{
    userValidation,
    validateRequest
  }
  