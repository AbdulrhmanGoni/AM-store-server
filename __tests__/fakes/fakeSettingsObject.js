import { arrayOfFakesDiscountCobones } from "./fakeDiscountCobones";
import { fakeCategoriesArray } from "./fakesProducts";

export const fakeSettingsObject = {
    discountCobones: arrayOfFakesDiscountCobones,
    productsCategories: fakeCategoriesArray,
    allowUsersChangePasswordEveryNDays: 30,
    defaultMonthlyTarget: 5000,
    deliveryPrice: 5,
    minFreeDeliveryEntitlementPrice: 80
}