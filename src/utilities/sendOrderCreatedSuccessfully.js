import sendEmail from "./sendEmail.js";

export default async function sendOrderCreatedSuccessfully({ userEmail, userName }) {
    const
        subject = "Your order has created successfully",
        message =
            `Hi ${userName}, Thank you for shopping in our store. ` +
            "We received your order and we here to tell you that you will not wait a lot, "
            + "Your order will arrive to you in less than a week."

    return sendEmail(userEmail, subject, message);
}