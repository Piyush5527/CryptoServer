import models from "../models/index.js";
async function createUser(user) {
  return await models.User.create({
    email: user.email,
    password: user.password,
  });
}
async function findUserByEmail(email) {
  const data = await models.User.findOne({ where: { email: email } });
  // console.log("data", data);
  return data;
}

async function findUserById(id) {
  const data = await models.User.findOne({ where: { user_id: id } });
  return data;
}

async function updateUser(id, user) {
  const data = await models.User.update(user, { where: { user_id: id } });
  return data;
}

export default {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser
};
