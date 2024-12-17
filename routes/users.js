import express from "express";
import userService from "../services/user-service.js";
import userRegistration from "../validations/user-validations/user-registration.js";
import userLogin from "../validations/user-validations/user-login.js";
import { messageEn } from "../utils/constants/message-en.js";
import CustomError from "../utils/errors/CustomError.js";
import jwtService from "../services/jwt-service.js";
import upload from "../config/multer-config.js";

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

router.patch("/details", jwtService.verifyToken, (req, res, next) => {
  userService
    .updateUserDetails(req)
    .then((data) => {
      res.json({
        success: true,
        message: messageEn.USER_UPDATE_SUCCESSFUL,
        status: 200,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/upload-kyc-image",
  jwtService.verifyToken,
  upload.fields([
    { name: "profile_pic", maxCount: 1 },
    { name: "aadhar_pic", maxCount: 1 },
  ]),
  (req, res, next) => {
    const frontImage = req.files.profile_pic ? req.files.profile_pic[0] : null;
    const backImage = req.files.aadhar_pic ? req.files.aadhar_pic[0] : null;

    if (!frontImage || !backImage) {
      return res
        .status(400)
        .json({ message: "Both front and back images are required." });
    }

    // You can now process the uploaded images (e.g., save file paths to the database)
    res.status(200).json({
      success:true,
      message: "Images uploaded successfully",
      files: {
        frontImage: frontImage.filename,
        backImage: backImage.filename,
      },
    });
  }
);

router.get("/t", async(req, res) => {
  const data = await userService.t()
  return res.json(data);
});

export default router;
