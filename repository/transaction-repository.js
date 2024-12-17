import models from "../models/index.js";

function createTransaction(transaction) {
    return models.Transactions.create({
        amount: transaction.amount,
        type: transaction.type,
        status: "PENDING",
        user_id: transaction.user_id,
        razorpay_order_id: transaction.razorpay_order_id,
    })
}

function updateTransaction(transaction) {
    return models.Transactions.update(transaction, {where: {razorpay_order_id: transaction.razorpay_order_id}})
}

function getTransactionByOrderId(orderId) {
    return models.Transactions.findOne({where: {razorpay_order_id: orderId}})
}

export default {createTransaction, updateTransaction, getTransactionByOrderId};
