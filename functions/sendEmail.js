import { createTransport } from 'nodemailer';

export default async function sendEmail(targetEmail, subject, body) {

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.STORE_EMAIL,
            pass: process.env.EMAIL_APP_MASSWORD
        }
    });

    const mailOptions = {
        from: process.env.STORE_EMAIL,
        to: targetEmail,
        subject,
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) { console.log(error) }
        else { console.log('Email sent:', info.response) }
    });
}