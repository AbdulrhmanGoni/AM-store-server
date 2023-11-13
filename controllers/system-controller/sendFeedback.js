// import sendEmail from "../functions/sendEmail.js";

// async function sendFeedback(req, res) {
//     try {
//         const { subject, body, userEmail } = req.body;
//         sendEmail(userEmail, subject, body)
//         res.status(200).json({ ok: true, message: "Your feedback sent successfully" });
//     } catch (error) {
//         console.log(error)
//         res.status(200).json({ ok: false, message: "There is error happends while sending the feedback" });
//     }
// }

// export default sendFeedback;