import userRepository from "../repository/user-repository.js";
import bcrypt from "bcrypt";
import CustomError from "../utils/errors/CustomError.js";
import jwtService from "./jwt-service.js";

async function createUser({ email, password }) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    const hashedPassword = await hashPassword(password);
    return await userRepository.createUser({
      email: email,
      password: hashedPassword,
    });
  }
  return null;
}

async function validatePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

async function loginUser({ email, password }, next) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    next(new CustomError("Invalid Username or Password", 401));
  } else {
    if (await validatePassword(password, user.password)) {
      return jwtService.generateToken(user.user_id );
    } else {
      next(new CustomError("Invalid Username or Password", 401));
    }
  }
}

export default { createUser, loginUser };
