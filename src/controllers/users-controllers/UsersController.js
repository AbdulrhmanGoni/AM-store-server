import getUserData from "./getUserData.js";
import usersOverview from "./usersOverview.js";
import updateUserName from "./updateUserName.js";
import changePassword from "./changePassword.js";
import usersCount from "./usersCount.js";
import getShoppingCart from "./getShoppingCart.js";
import addToShoppingCart from "./addToShoppingCart.js";
import removeFromShoppingCart from "./removeFromShoppingCart.js";
import setShoppingCart from "./setShoppingCart.js";
import clearShoppingCart from "./clearShoppingCart.js";
import getFavorites from "./getFavorites.js";
import clearFavorites from "./clearFavorites.js";
import toggleFavorites from "./toggleFavorites.js";
import setFavorites from "./setFavorites.js";
import getLocations from "./getLocations.js";
import addLocation from "./addLocation.js";
import setSelectedLocation from "./setSelectedLocation.js";
import deleteLocation from "./deleteLocation.js";
import getPaymentMethods from "./getPaymentMethods.js";
import addPaymentMethod from "./addPaymentMethod.js";
import setChoosedPaymentMethod from "./setChoosedPaymentMethod.js";
import deletePaymentMethod from "./deletePaymentMethod.js";

class UsersController {
    constructor() { }
}

export default Object.assign(UsersController.prototype, {
    getUserData,
    usersOverview,
    updateUserName,
    changePassword,
    usersCount,
    getShoppingCart,
    addToShoppingCart,
    removeFromShoppingCart,
    setShoppingCart,
    clearShoppingCart,
    getShoppingCart,
    getFavorites,
    toggleFavorites,
    clearFavorites,
    setFavorites,
    getLocations,
    addLocation,
    setSelectedLocation,
    deleteLocation,
    getPaymentMethods,
    addPaymentMethod,
    setChoosedPaymentMethod,
    deletePaymentMethod
})