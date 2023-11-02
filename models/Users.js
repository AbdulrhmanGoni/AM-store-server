import { Schema, Types, model } from "mongoose";

export const LocationSchema = {
    theName: String,
    phone: String,
    country: String,
    city: String,
    street: String,
    moreDetails: String,
    type: String,
    id: String,
    _id: false

};

export const PaymentMethodSchema = {
    theName: String,
    number: Number,
    expired: String,
    _id: false
}

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
    userShoppingCart: { type: [String] },
    userAddress: {
        selectedLocation: LocationSchema,
        locationsList: [LocationSchema],
    },
    userPaymentMethodes: {
        cardsList: [PaymentMethodSchema],
        choosedMethod: PaymentMethodSchema,
    },
    userFavorites: [Types.ObjectId],
    userOrders: [Types.ObjectId],
    emailIsVerified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

const UserModel = model("users", UserSchema);
export default UserModel;