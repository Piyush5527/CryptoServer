import transactionRepository from "../repository/transaction-repository.js";
import razorpayConfig from "../config/razorpay-config.js";
import constantMethods from "../utils/methods/constant-methods.js";

async function initiateDepositTransaction(req) {

  const orderOptions = {
    amount: req.body.amount*100,
    currency: "INR",
    receipt: "something",
    payment_capture: 1,
  }
  try{
    const order = await razorpayConfig.orders.create(orderOptions);

    const transaction = {
      amount: req.body.amount,
      type: "DEPOSIT",
      user_id: req.user_id,
      razorpay_order_id: order.id,
    };
    const data = await transactionRepository.createTransaction(transaction);
    console.log(data)
    return order;
  }
  catch (error) {
    console.log(error)
  }
}

async function updateTransactionStatus(orderId, status){
  try {
    status = status ? "COMPLETED" : "FAILED";
    const transaction = {
      razorpay_order_id: orderId,
      status: status,
    }
    return await transactionRepository.updateTransaction(transaction);
  }
  catch (error) {
    console.log(error)
  }
}



export default {
  initiateDepositTransaction,
  updateTransactionStatus,
};
