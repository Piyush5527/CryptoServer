// "use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      // For example: User.belongsTo(models.User, { foreignKey: "referred_by" });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          len: {
            args: [1, 100],
            msg: "Full name must be between 1 and 100 characters.",
          },
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          isNumeric: {
            msg: "Phone number must contain only numbers.",
          },
          len: {
            args: [7, 20],
            msg: "Phone number must be between 7 and 20 characters.",
          },
        },
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email is required.",
          },
          isEmail: {
            msg: "Must provide a valid email address.",
          },
          len: {
            args: [5, 150],
            msg: "Email must be between 5 and 150 characters.",
          },
        },
      },
      kyc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isIn: {
            args: [[true, false]],
            msg: "KYC must be a boolean value.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required.",
          },
          len: {
            args: [8, 100],
            msg: "Password must be at least 8 characters long.",
          },
        },
      },
      aadhar_no: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "Aadhar number is required.",
          },
          len: {
            args: [12, 20],
            msg: "Aadhar number must be between 12 and 20 characters.",
          },
        },
      },
      unique_referral: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
          len: {
            args: [0, 50],
            msg: "Referral code must be up to 50 characters.",
          },
        },
      },
      referred_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Referred by must be a valid user ID.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
  );

  return User;
};
