import models from "../models/index.js";

export async function getAppParamByName(appParamName) {
    return await models.AppParam.findOne({ where: { param_name: appParamName } });
}

export default { getAppParamByName };