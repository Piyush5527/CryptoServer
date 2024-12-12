"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "AppParams", // Name of the table
      [
        {
          param_name: "profile_pic",
          param_desc: "Profile pictures of users",
          param_value: "../images/profile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          param_name: "aadhar_pic",
          param_desc: "Aadhar cards of users",
          param_value: "../images/aadhar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          param_name: "image_path",
          param_desc: "Root path for images",
          param_value: "../images/",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AppParams", null, {});
  },
};
