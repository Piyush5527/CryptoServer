'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate(models) {
      // Wallet belongs to Currency

      Wallet.belongsTo(models.Currency, {
        foreignKey: 'currency_id',
        as: 'currency'
      });
    }
  }

  Wallet.init({
    wallet_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Currencies',
        key: 'currency_id'
      }
    },
    balance: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false,
      defaultValue: 0.0
    }
  }, {
    sequelize,
    modelName: 'Wallet',
    tableName: 'Wallets', // Table name
    underscored: true, // Allows snake_case for timestamps (created_at, updated_at)
    timestamps: true
  });

  return Wallet;
};
