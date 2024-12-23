// "use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      fullname: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
        validate: {
          isNumeric: true,
        },
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      kyc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aadhar_no: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      unique_referral: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("ADMIN", "USER"),
        unique: false,
        allowNull: false,
        defaultValue:"ADMIN"
      },
      referred_by: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "Users", // Reference table name
          key: "user_id", // Reference primary key
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
