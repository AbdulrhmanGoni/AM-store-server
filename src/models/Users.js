import { Schema, model } from "mongoose";
import { ArrayOfObjectIds, Email, Password, PersonName, RequiredNumber, RequiredString } from "../utilities/schemaTypesOptions.js";

export const LocationSchema = new Schema({
    theName: PersonName(),
    phone: RequiredString(),
    country: RequiredString(),
    city: RequiredString(),
    street: RequiredString(),
    moreDetails: { type: String, maxLength: 400 },
    id: RequiredString(),
    _id: false
});

export const PaymentMethodSchema = new Schema({
    theName: PersonName(),
    number: RequiredNumber(),
    expired: RequiredString(),
    _id: false
});

const UserSchema = new Schema(
    {
        userName: PersonName(),
        userEmail: Email(),
        userPassword: Password(),
        avatar: String,
        userShoppingCart: {
            type: [String],
            default: []
        },
        userAddress: {
            selectedLocation: LocationSchema,
            locationsList: {
                type: [LocationSchema],
                default: []
            },
        },
        userPaymentMethodes: {
            cardsList: {
                type: [PaymentMethodSchema],
                default: []
            },
            choosedMethod: PaymentMethodSchema,
        },
        userFavorites: ArrayOfObjectIds(),
        userOrders: ArrayOfObjectIds(),
        hisEmailVerified: {
            type: Boolean,
            default: false
        },
        lastPasswordChange: {
            type: Date,
            default: null
        },
        signingMethod: {
            type: String,
            default: "Email & Password"
        }
    },
    { timestamps: true, versionKey: false }
);

const UsersModel = model("users", UserSchema);
export default UsersModel;