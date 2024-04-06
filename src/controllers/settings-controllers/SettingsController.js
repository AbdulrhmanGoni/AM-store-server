import getSettings from "./getSettings.js"
import updateSetting from "./updateSetting.js"
import getProductsCategoriesList from "./getProductsCategoriesList.js"
import getStoreVariables from "./getStoreVariables.js"
import getDiscountCobones from "./getDiscountCobones.js"
import addDiscountCobone from "./addDiscountCobone.js"
import deleteDiscountCobone from "./deleteDiscountCobone.js"

class SettingsController {
    constructor() { }
}

export default Object.assign(SettingsController.prototype, {
    getSettings,
    updateSetting,
    getProductsCategoriesList,
    getStoreVariables,
    getDiscountCobones,
    addDiscountCobone,
    deleteDiscountCobone
})