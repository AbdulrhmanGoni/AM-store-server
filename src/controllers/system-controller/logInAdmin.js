import AdminModel from "../../models/Admins.js";
import bcrypt from "bcrypt";
import messageResponse from "../../utilities/messageResponse.js";
import { generateJWT } from "../../utilities/jwtUtilities.js";

export default async function logInAdmin({ adminEmail, adminPassword }) {
    try {
        const adminData = await AdminModel.findOne({ adminEmail }, { createdAt: 0, updatedAt: 0 });
        if (adminData) {
            if (adminData.signingMethod === "Google") {
                return messageResponse("Your email registred by another signing up method", 200);
            } else {
                const pass = bcrypt.compareSync(adminPassword, adminData.adminPassword);
                if (pass) {
                    const token = generateJWT({ adminId: adminData._id, role: "admin" });
                    adminData.adminPassword = undefined;
                    return { status: 200, response: { adminData, accessToken: token, ok: true } };
                }
                else return messageResponse("There is issue in email or password, Try again with more verify");
            }
        }
        else return messageResponse("Unauthorized Email", 401);
    } catch (error) {
        console.log(error)
        return messageResponse("Unexpected Error");
    }
}