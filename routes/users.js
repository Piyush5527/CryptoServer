import express from "express";
import userService from "../services/user-service.js";
import userRegistration from "../validations/user-validations/user-registration.js";
const router = express.Router();
userRegistration;

router.get("/hello", (req, res) => {
  userService.createUser();


});

router.post(
  "/register",
  userRegistration.userValidation,
  userRegistration.validateRequest,
  (req, res) => {
    userService.createUser(req.body)
    res.json("user registered successfully");
  }
);

export default router;
