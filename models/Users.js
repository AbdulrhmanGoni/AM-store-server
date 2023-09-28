import { Schema, model } from "mongoose";

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
