'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate(models) {
      // Associations
      Wallet.belongsTo(models.Currency, { foreignKey: 'currency_id' });
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
        key: 'id'
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
    tableName: 'Wallets',
    underscored: true, // Allows snake_case for timestamps (created_at, updated_at)
    timestamps: true
  });

  return Wallet;
};
