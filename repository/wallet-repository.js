import models from "../models/index.js";

async function getWalletByUserAndCurrency(userId, currencyId) {
    return await models.Wallet.findOne({where: {user_id: userId, currency_id: currencyId}})
}

async function updateBalanceInWallet(wallet, walletId) {
    return await models.Wallet.update(wallet, {where: {wallet_id: walletId}})
}

async function getSummaryWalletData(userId) {
    return await models.Wallet.findAll({
        where: {user_id: userId}, limit: 3, include: [
            {
                model: models.Currency,
                as: "currency",
                attributes: ["currency_name", "short_name"]
            }
        ]
    })
}

export default {getWalletByUserAndCurrency, updateBalanceInWallet, getSummaryWalletData};