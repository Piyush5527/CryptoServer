'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transactions extends Model {
        static associate(models) {
            // Define association here
            Transactions.belongsTo(models.Users, {
                foreignKey: 'user_id',
                as: 'user'
            });
        }
    }

    Transactions.init(
        {
            transaction_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            amount: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM('DEPOSIT', 'ROOM_JOIN'),
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'),
                allowNull: false
            },
            remarks: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            razorpay_order_id: {
                type: DataTypes.TEXT,
                allowNull: true,
                unique: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Transactions',
            tableName: 'Transactions',
            timestamps: true
        }
    );
    return Transactions;
};
