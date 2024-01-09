import getProductsCategoriesList from "./getProductsCategoriesList.js"
import getDiscountCobones from "./getDiscountCobones.js"
import addDiscountCobone from "./addDiscountCobone.js"
import deleteDiscountCobone from "./deleteDiscountCobone.js"

class SettingsController {
    constructor() { }
}

export default Object.assign(SettingsController.prototype, {
    getProductsCategoriesList,
    getDiscountCobones,
    addDiscountCobone,
    deleteDiscountCobone
})