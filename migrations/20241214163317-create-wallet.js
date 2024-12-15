'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Wallets', {
      wallet_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      currency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Currencies',
          key: 'currency_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      balance: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false,
        defaultValue: 0.0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add a unique constraint to prevent a user from having multiple wallets for the same currency
    await queryInterface.addConstraint('Wallets', {
      fields: ['user_id', 'currency_id'],
      type: 'unique',
      name: 'unique_user_currency'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Wallets');
  }
};
