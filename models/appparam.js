"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class AppParam extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  AppParam.init(
    {
      param_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      param_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Parameter name is required.",
          },
          len: {
            args: [1, 100],
            msg: "Parameter name must be between 1 and 100 characters.",
          },
        },
      },
      param_desc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      param_value: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Parameter value is required.",
          },
          len: {
            args: [1, 255],
            msg: "Parameter value must be between 1 and 255 characters.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "AppParam",
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
  );

  return AppParam;
};
