import loggedUser from "./loggedUser.js";
import logInUser from "./logInUser.js";
import loggedAdmin from "./loggedAdmin.js";
import logInAdmin from "./logInAdmin.js";
import logInUserWithGoogle from "./logInUserWithGoogle.js";
import logInAdminWithGoogle from "./logInAdminWithGoogle.js";
import registerUserWithGoogle from "./registerUserWithGoogle.js";
import registerUser from "./registerUser.js";
import sendVerificationCodeToEmail from "./sendVerificationCodeToEmail.js";
import verificationEmailsCodesHandler from "./verificationEmailsCodesHandler.js";
import verifyUserEmail from "./verifyUserEmail.js";
import changeUserPassword from "./changeUserPassword.js";
import getNotifications from "./getNotifications.js";
import setNotificationsAsRead from "./setNotificationsAsRead.js";
import addFeedback from "./addFeedback.js";
import deleteFeedback from "./deleteFeedback.js";
import getUsersFeedback from "./getUsersFeedback.js";

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
    sendVerificationCodeToEmail,
    verifyUserEmail,
    verificationEmailsCodesHandler,
    changeUserPassword,
    getNotifications,
    setNotificationsAsRead,
    getUsersFeedback,
    addFeedback,
    deleteFeedback
})