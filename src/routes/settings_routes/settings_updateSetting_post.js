import { startSession } from "mongoose";
import { storeVariablesNames } from "../../CONSTANT/storeVariables.js";
import SettingsController from "../../controllers/settings-controllers/SettingsController.js";
import asyncRouteHandler from "../../utilities/asyncRouteHandler.js";
import updateRedisCache from "../../cache/updateRedisCache.js";

export default asyncRouteHandler(
    async function settings_updateSetting_post(req, res) {
        const { setting, newValue } = req.body;
        const isStoreVariable = storeVariablesNames.includes(setting);
        if (isStoreVariable) {
            const session = await startSession();
            session.startTransaction();
            const respond = await SettingsController.updateSetting(setting, newValue, session);
            if (respond) {
                const updateResult = await updateRedisCache("store-variables", (currentData) => {
                    if (currentData) {
                        currentData[setting] = newValue
                    }
                    return currentData
                })
                if (updateResult) {
                    await session.commitTransaction();
                    res.status(200).json(respond);
                    return;
                }
            }

            await session.abortTransaction();
            res.status(400).json(false);
        } else {
            const respond = await SettingsController.updateSetting(setting, newValue);
            res.status(respond === undefined ? 400 : 200).json(respond);
        }
    }
)