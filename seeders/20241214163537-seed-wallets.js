'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wallets', [
      {
        user_id: 1,
        currency_id: 1, // INR
        balance: 5000.00,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 1,
        currency_id: 2, // BTC
        balance: 0.025,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 1,
        currency_id: 3, // ETH
        balance: 1.256,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        currency_id: 1, // INR
        balance: 10000.00,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        currency_id: 2, // BTC
        balance: 0.015,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wallets', null, {});
  }
};
