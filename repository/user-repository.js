import { QueryTypes, Sequelize } from "sequelize";
import models from "../models/index.js";
async function createUser(user) {
  return await models.User.create({
    email: user.email,
    password: user.password,
    unique_referral: user.unique_referral,
    referred_by: user.referred_by,
  });
}
async function findUserByEmail(email) {
  return await models.User.findOne({ where: { email: email } });
}

async function findUserById(id) {
  return await models.User.findOne({ where: { user_id: id } });
}

async function updateUser(id, user) {
  return await models.User.update(user, { where: { user_id: id } });
}

async function findUserByReferral(referralCode) {
  return await models.User.findAll({
    where: { unique_referral: referralCode },
  });
}

async function findReferredUsers(id) {
  const query = `WITH RECURSIVE referral_tree(user_id, user_name, referred_by, level) AS (
    SELECT 
        u.user_id,
        COALESCE(u.fullname, 'N/A') AS user_name,
        u.referred_by,
        1 AS level
    FROM "Users" u 
    WHERE u.referred_by = :userId

    UNION ALL

    -- Recursive Case
    SELECT 
        u.user_id,
        COALESCE(u.fullname, 'N/A') AS user_name,
        u.referred_by,
        rt.level + 1
    FROM "Users" u
    INNER JOIN referral_tree rt
        ON u.referred_by = rt.user_id
    WHERE rt.level < 2
  )
  SELECT *
  FROM referral_tree
  ORDER BY level, user_id;
  `;

  try {
    const referrals = await models.sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { userId: id },
    });
    return referrals;
  } catch (err) {
    console.log(err);
  }
}
export default {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  findUserByReferral,
  findReferredUsers,
};
