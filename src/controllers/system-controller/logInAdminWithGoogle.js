import AdminModel from "../../models/Admins.js";
import googleAccountGetter from "../../utilities/googleAccountGetter.js";
import messageResponse from "../../utilities/messageResponse.js";
import { generateJWT } from "../../utilities/jwtUtilities.js";
import { compareSync } from "bcrypt";

export default async function logInAdminWithGoogle(googleUserCredentials) {
    try {
        const { ok, googleResponse } = await googleAccountGetter(googleUserCredentials);
        if (ok) {
            const adminData = await AdminModel.findOne({ adminEmail: googleResponse.email }, { createdAt: 0, updatedAt: 0 });
            if (adminData) {
                if (adminData.signingMethod === "Google") {
                    const correctPassword = compareSync(googleResponse.sub, adminData.adminPassword);
                    if (correctPassword) {
                        const token = generateJWT({ adminId: adminData._id, role: "admin" })
                        adminData.adminPassword = undefined;
                        return { status: 200, response: { adminData, accessToken: token, ok: true } };
                    } else {
                        return messageResponse("Google Authorization failed");
                    }
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