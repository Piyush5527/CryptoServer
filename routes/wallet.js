import express from "express";
import jwtService from "../services/jwt-service.js";
import walletService from "../services/wallet-service.js";
import baseRoute from "./base-route.js";
import {messageEn} from "../utils/constants/message-en.js";

const router = express.Router();

router.get("/balance", jwtService.verifyToken, async (req, res) => {
    const {isInDashboard} = req.query;
    const response = await walletService.getWalletDetails(req.user_id,isInDashboard)
    baseRoute.successResponseWithData(res, response, messageEn.SUCCESS);
})
export default router;
