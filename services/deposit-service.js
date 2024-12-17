import transactionRepository from "../repository/transaction-repository.js";
import razorpayConfig from "../config/razorpay-config.js";
import currencyRepository from "../repository/currency-repository.js";
import walletRepository from "../repository/wallet-repository.js";

async function initiateDepositTransaction(req) {

    const orderOptions = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: "something",
        payment_capture: 1,
    }
    try {
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
    } catch (error) {
        console.log(error)
    }
}

async function updateTransactionStatus(transactionData, userId) {
    try {
        transactionData.status = transactionData.success ? "COMPLETED" : "FAILED";
        const transaction = {
            razorpay_order_id: transactionData.razorpay_order_id,
            status: transactionData.status,
        }
        const updatedTransaction = await transactionRepository.updateTransaction(transaction);
        if (updatedTransaction && transactionData.success === true) {
            await addMoneyToWallet(transactionData,userId);
        }
        return updatedTransaction;
    } catch (error) {
        console.log(error)
    }
}

async function addMoneyToWallet(transaction,userId){
    const currency = await currencyRepository.getCurrencyByShortName("INR");
    if(currency){
        const userWallet = await walletRepository.getWalletByUserAndCurrency(userId,currency.currency_id);
        const userTransaction = await transactionRepository.getTransactionByOrderId(transaction.razorpay_order_id);
        const updatedWallet = {balance: Number(userWallet.balance) + Number(userTransaction.amount)};
        await walletRepository.updateBalanceInWallet(updatedWallet,userWallet.wallet_id);
    }
}


export default {
    initiateDepositTransaction,
    updateTransactionStatus,
};
