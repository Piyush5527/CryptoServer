import models from "../models/index.js";
import userRepository from "../repository/user-repository.js";
import constantMethods from "../utils/methods/constant-methods.js";
async function userReferralDetail(req) {
  var user;
  var referralDetails;
  user = await userRepository.findUserById(req.user_id);
  if (user) {
    referralDetails = await userRepository.findUserByReferral(
      user.unique_referral
    );
    referralDetails = constantMethods.getData(referralDetails);
  }
  constantMethods.keepOnly(referralDetails, ["fullname"]);
  var response = {
    referral_code: user.unique_referral,
    referralDetails: referralDetails,
  };

  return response;
}

async function referredUsers(req) {
  const referrals = await userRepository.findReferredUsers(req.user_id);
  const result = buildReferralTree(referrals, req.user_id);
  return result;
}

function buildReferralTree(referrals, rootUserId) {
  // Create a map to store each user by their ID for quick lookup
  const userMap = {};

  // Initialize the userMap with each user
  referrals.forEach(referral => {
    userMap[referral.user_id] = {
      user_id: referral.user_id,
      name: referral.user_name,
      referred: []
    };
  });

  // Build the tree structure by linking referred users to their parent
  const tree = [];
  referrals.forEach(referral => {
    if (referral.referred_by === rootUserId) {
      // Top-level referrals (directly referred by root user)
      tree.push(userMap[referral.user_id]);
    } else if (userMap[referral.referred_by]) {
      // Add referred users to their parent's "referred" array
      userMap[referral.referred_by].referred.push(userMap[referral.user_id]);
    }
  });

  return tree;
}


export default { userReferralDetail,referredUsers };
