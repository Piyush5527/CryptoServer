'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Currencies', [
      {
        currency_name: 'Indian Rupee',
        short_name: 'INR',
        symbol: '₹',
        precision: 2,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency_name: 'Bitcoin',
        short_name: 'BTC',
        symbol: '₿',
        precision: 8,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency_name: 'Ethereum',
        short_name: 'ETH',
        symbol: 'Ξ',
        precision: 8,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency_name: 'Tether',
        short_name: 'USDT',
        symbol: '$',
        precision: 6,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        currency_name: 'Dogecoin',
        short_name: 'DOGE',
        symbol: 'Ð',
        precision: 8,
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Currencies', null, {});
  }
};
