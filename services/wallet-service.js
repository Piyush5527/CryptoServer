import walletRepository from "../repository/wallet-repository.js";


async function getWalletDetails(userId, isInDashboard){
    try{
        let walletData;
        if (isInDashboard) {
            walletData = await getSummaryWalletData(userId)
        }
        return walletData;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSummaryWalletData(userId){
    return await walletRepository.getSummaryWalletData(userId);
}

export default {getWalletDetails}