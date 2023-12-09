import { Schema, Types, model } from "mongoose";

export const LocationSchema = new Schema({
    theName: String,
    phone: String,
    country: String,
    city: String,
    street: String,
    moreDetails: String,
    type: String,
    id: String,
    _id: false
});

export const PaymentMethodSchema = new Schema({
    theName: String,
    number: Number,
    expired: String,
    _id: false
});

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true,
        minLength: 6
    },
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
    userFavorites: {
        type: [Types.ObjectId],
        default: []
    },
    userOrders: {
        type: [Types.ObjectId],
        default: []
    },
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
    { timestamps: true }
);

const UsersModel = model("users", UserSchema);
export default UsersModel;