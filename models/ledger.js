'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ledger extends Model {
    static associate(models) {
      // Associations
      Ledger.belongsTo(models.Wallet, { foreignKey: 'wallet_id' });
      Ledger.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Ledger.init({
    ledger_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    transaction_type: {
      type: DataTypes.ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false
    },
    reference_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Ledger',
    tableName: 'Ledgers',
    underscored: true, // Allows snake_case for timestamps (created_at, updated_at)
    timestamps: true
  });

  return Ledger;
};
