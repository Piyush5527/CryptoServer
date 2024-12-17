'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate(models) {
      // Currency has many Wallets
      Currency.hasMany(models.Wallet, {
        foreignKey: 'currency_id', // Foreign key in Wallet table
        as: 'wallets', // Alias for the association (plural, since hasMany)
      });
    }
  }

  Currency.init({
    currency_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    currency_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    short_name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    symbol: {
      type: DataTypes.STRING(10)
    },
    precision: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      defaultValue: 'ACTIVE'
    }
  }, {
    sequelize,
    modelName: 'Currency',
    tableName: 'Currencies', // This must match the table name used in the references
    underscored: true, // Allows snake_case for timestamps (created_at, updated_at)
    timestamps: true
  });

  return Currency;
};
