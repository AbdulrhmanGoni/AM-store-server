import AdminModel from "../../models/Admins.js";
import jwt from "jsonwebtoken";
import googleAccountGetter from "../../utilities/googleAccountGetter.js";


export default async function logInAdminWithGoogle(googleUserAccessToken) {
    try {
        const response = await googleAccountGetter(googleUserAccessToken);
        if (response) {
            const adminData = await AdminModel.findOne({ adminEmail: response.email }, { createdAt: 0, updatedAt: 0 });
            if (adminData) {
                if (adminData.signingMethod === "Google auth") {
                    const token = jwt.sign(
                        { adminId: adminData._id, role: "admin" },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "30d" }
                    )
                    adminData.adminPassword = undefined;
                    return { adminData, accessToken: token };
                }
                else return false;
            }
            else return null;
        }
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}