import express, { response } from "express";
import jwtService from "../services/jwt-service.js";
import depositService from "../services/deposit-service.js";
import baseRoute from "./base-route.js";
import {messageEn} from "../utils/constants/message-en.js";
const router = express.Router();

router.post("/initiate-deposit", jwtService.verifyToken, async (req, res) => {
  const data = await depositService.initiateDepositTransaction(req);

  return res.status(201).json({
    success: true,
    message: "Deposit Initiated Successfully",
    data: data,
  });
});

router.post("/verify-deposit", jwtService.verifyToken, async (req, res) => {
  await depositService.updateTransactionStatus(req.body,req.user_id)
  return baseRoute.successResponseWithoutData(res, messageEn.SUCCESS)
})

export default router;
