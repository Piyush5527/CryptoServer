'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ledgers', [
      {
        user_id: 1,
        wallet_id: 1, // User 1's INR wallet
        transaction_type: 'DEPOSIT',
        amount: 5000.00,
        reference_id: 'razorpay_12345',
        remarks: 'Initial deposit',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 1,
        wallet_id: 2, // User 1's BTC wallet
        transaction_type: 'DEPOSIT',
        amount: 0.025,
        reference_id: 'blockchain_tx_abc123',
        remarks: 'Crypto deposit',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        wallet_id: 4, // User 2's INR wallet
        transaction_type: 'WITHDRAWAL',
        amount: 1000.00,
        reference_id: 'withdraw_request_5678',
        remarks: 'Withdrawal processed',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ledgers', null, {});
  }
};
