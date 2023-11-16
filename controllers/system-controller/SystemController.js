import loggedUser from "./loggedUser.js";
import logInUser from "./logInUser.js";
import loggedAdmin from "./loggedAdmin.js";
import logInAdmin from "./logInAdmin.js";
import logInUserWithGoogle from "./logInUserWithGoogle.js";
import logInAdminWithGoogle from "./logInAdminWithGoogle.js";
import registerUserWithGoogle from "./registerUserWithGoogle.js";
import registerUser from "./registerUser.js";
import sendVerificationEmailMail from "./sendVerifictionEmailMail.js";
import verifyUserEmail from "./verifyUserEmail.js";

class SystemController {
    constructor() { }
}

export default Object.assign(SystemController.prototype, {
    loggedUser,
    logInUser,
    loggedAdmin,
    logInAdmin,
    logInUserWithGoogle,
    logInAdminWithGoogle,
    registerUserWithGoogle,
    registerUser,
    sendVerificationEmailMail,
    verifyUserEmail
})