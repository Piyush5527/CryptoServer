// "use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // Define associations here
      // For example: Image.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
  }

  Image.init(
    {
      image_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      image_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image name is required.",
          },
          len: {
            args: [1, 255],
            msg: "Image name must be between 1 and 255 characters.",
          },
        },
      },
      image_type: {
        type: DataTypes.ENUM("PROOF", "PROFILE"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["PROOF", "PROFILE"]],
            msg: "Image type must be either 'PROOF' or 'PROFILE'.",
          },
        },
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Users", // Reference table name
          key: "user_id", // Reference primary key
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        validate: {
          isInt: {
            msg: "User ID must be a valid integer.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
  );

  return Image;
};
