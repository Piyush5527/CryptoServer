import express from "express";
import jwtService from "../services/jwt-service.js";
import referralService from "../services/referral-service.js";
import { messageEn } from "../utils/constants/message-en.js";
const router = express.Router();

router.get("/details", jwtService.verifyToken, async (req, res) => {
  const data1 = await referralService.userReferralDetail(req);
  return res.json({
    success: true,
    message: messageEn.SUCCESS,
    data: data1,
    status: 200,
  });
});

router.get(
  "/referred-users",
  jwtService.verifyToken,
  async (req, res, next) => {
    const data = await referralService.referredUsers(req);
    return res.json({
      success: true,
      message: messageEn.SUCCESS,
      data: data,
      status: 200,
    });
  }
);
export default router;
