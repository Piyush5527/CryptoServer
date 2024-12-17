import models from "../models/index.js";

async function getCurrencyByShortName(name) {
    return await models.Currency.findOne({ where: { short_name: name } });
}

export default { getCurrencyByShortName };