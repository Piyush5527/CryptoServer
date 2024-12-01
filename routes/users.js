import express from "express";
import userService from "../services/user-service.js";
import userRegistration from "../validations/user-validations/user-registration.js";
import userLogin from "../validations/user-validations/user-login.js";
import { messageEn } from "../utils/constants/message-en.js";
import CustomError from "../utils/errors/CustomError.js";
import jwtService from "../services/jwt-service.js";
const router = express.Router();
messageEn;
router.post(
  "/register",
  userRegistration.userValidation,
  userRegistration.validateRequest,
  async (req, res, next) => {
    const response = await userService.createUser(req.body);
    if (response) {
      return res.status(201).json({
        success: true,
        message: messageEn.USER_RESGISTRATION_SUCCESSFUL,
        status: 201,
      });
    }
    next(new CustomError(messageEn.USER_RESGISTRATION_ERROR, 500));
  }
);

router.post(
  "/login",
  userLogin.loginValidation,
  userLogin.validateRequest,
  async (req, res, next) => {
    const token = await userService.loginUser(req.body, next);
    if (!token) {
      return;
    }
    return res.json({
      success: true,
      message: messageEn.USER_LOGIN_SUCCESSFUL,
      token: token,
      status: 200,
    });
  }
);

router.get("/t", (req, res) => {
  return res.json("test");
});

export default router;
