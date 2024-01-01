import AdminModel from "../../models/Admins.js";
import jwt from "jsonwebtoken";
import googleAccountGetter from "../../utilities/googleAccountGetter.js";
import messageResponse from "../../utilities/messageResponse.js";

export default async function logInAdminWithGoogle(googleUserCredentials) {
    try {
        const { ok, googleResponse } = await googleAccountGetter(googleUserCredentials);
        if (ok) {
            const adminData = await AdminModel.findOne({ adminEmail: googleResponse.email }, { createdAt: 0, updatedAt: 0 });
            if (adminData) {
                if (adminData.signingMethod === "Google auth") {
                    const token = jwt.sign(
                        { adminId: adminData._id, role: "admin" },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "30d" }
                    )
                    adminData.adminPassword = undefined;
                    return { status: 200, response: { adminData, accessToken: token, ok: true } };
                }
                else return messageResponse("Your email registred by another signing up method", 200);
            }
            else return messageResponse("You didn't have registered with us before");
        }
        else return googleResponse
    } catch (error) {
        console.log(error);
        return messageResponse("Unexpected Error !");
    }
}