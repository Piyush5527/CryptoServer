'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate(models) {
      // Define associations if needed (like linking to Wallet or Ledger)
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
    tableName: 'Currencies',
    underscored: true, // Allows snake_case for timestamps (created_at, updated_at)
    timestamps: true
  });

  return Currency;
};
