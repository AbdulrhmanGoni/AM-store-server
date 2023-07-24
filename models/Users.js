import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    userName: { type: String },
    userEmail: { type: String },
    userPassword: { type: String },
    avatar: { type: String },
    userShoppingCart: { type: Array },
    userAddress: {
        selectedLocation: { type: Object },
        locationsList: { type: Array },
    },
    userPaymentMethodes: {
        cardsList: { type: Array },
        choosedMethod: { type: Object },
    },
    userFavorites: { type: Array },
    userOrders: { type: Array }
}, { timestamps: true }
);

const UserModel = model("users", UserSchema);
export default UserModel;
