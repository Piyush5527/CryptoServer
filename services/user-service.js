import userRepository from "../repository/user-repository.js";

function createUser({email,password}) {
  
  userRepository.createUser();
}

export default { createUser };
