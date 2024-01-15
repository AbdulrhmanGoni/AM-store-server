import { createTransport } from 'nodemailer';

export default async function sendEmail(targetEmail, subject, body, html) {
    try {
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.STORE_EMAIL,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.STORE_EMAIL,
            to: targetEmail,
            subject,
            text: body,
            html
        };

        const { accepted } = await transporter.sendMail(mailOptions);
        return accepted.some(email => email === targetEmail);
    } catch (error) {
        console.log(error)
        return false;
    }
}