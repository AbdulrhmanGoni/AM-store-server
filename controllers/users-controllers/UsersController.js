import changePassword from "./changePassword.js";
import getUserData from "./getUserData.js";
import updateUserName from "./updateUserName.js";
import getFavorites from "./getFavorites.js";
import clearFavorites from "./clearFavorites.js";
import toggleFavorites from "./toggleFavorites.js";
import setFavorites from "./setFavorites.js";
import getPaymentMethods from "./getPaymentMethods.js";
import addPaymentMethod from "./addPaymentMethod.js";
import setChoosedPaymentMethod from "./setChoosedPaymentMethod.js";
import deletePaymentMethod from "./deletePaymentMethod.js";

class UsersController {
    constructor() { }
}

export default Object.assign(UsersController.prototype, {
    getUserData,
    changePassword,
    updateUserName,
    getFavorites,
    toggleFavorites,
    clearFavorites,
    setFavorites,
    getPaymentMethods,
    addPaymentMethod,
    setChoosedPaymentMethod,
    deletePaymentMethod,
})