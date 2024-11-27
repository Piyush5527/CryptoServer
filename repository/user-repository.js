import models from '../models/index.js';

const userModel = models.User;

function createUser(){
    console.log("SOMETHING HAPPENED");
}
function findUserByEmail(email){
    userModel.findOne({where:{ email: email}})
}

export default{
    createUser
}