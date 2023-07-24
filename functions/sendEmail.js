import { createTransport } from 'nodemailer';

function sendEmail() {

    let transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'abdulrhmangoni@gmail.com',
            pass: 'albrnawe10'
        }
    });

    let mailOptions = {
        from: 'abdulrhmangoni@gmail.com',
        to: 'dhmealbrnawe10@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default sendEmail