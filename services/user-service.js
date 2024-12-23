import userRepository from "../repository/user-repository.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/errors/CustomError.js";
import jwtService from "./jwt-service.js";
import crypto from "crypto";
import { log } from "console";

async function createUser({ email, password, referralCode }) {
  const user = await userRepository.findUserByEmail(email);
  var referredBy = null;
  if (referralCode) {
    referredBy = await userRepository.findUserByReferral(referralCode);
  }
  if (!user) {
    const hashedPassword = await hashPassword(password);
    return await userRepository.createUser({
      email: email,
      password: hashedPassword,
      unique_referral: createUniqueReferralCode(),
      referred_by: referredBy ? referredBy[0]?.user_id : null,
    });
  }
  return null;
}

function createUniqueReferralCode() {
  return crypto.randomBytes(12).toString("hex");
}

async function validatePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

async function loginUser({ email, password }, next) {
  try {
    const user = await userRepository.findUserByEmail(email);
    if (!user || !(await validatePassword(password, user.password))) {
      return next(new CustomError("Invalid Username or Password", 401));
    }
    return jwtService.generateToken(user.user_id);
  } catch (err) {
    return next(err);
  }
}

async function updateUserDetails(req) {
  const user = await userRepository.findUserById(req.user_id);
  if (user) {
    return await userRepository.updateUser(user.user_id, req.body);
  }
}

async function t(){
  return await userRepository.findReferredUsers(5);
}

export default { createUser, loginUser, updateUserDetails, t };
