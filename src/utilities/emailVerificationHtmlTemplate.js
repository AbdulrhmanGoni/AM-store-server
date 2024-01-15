export default function emailVerificationHtmlTemplate({ userName }, verificationCode) {
    return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Ferifiction AM Store</title>
                    <style type="text/css">
                            * {
                                box-sizing: border-box;
                            }
                            body {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                gap: 12px;
                                width: 100%;
                                min-height: 100vh;
                                padding: 12px;
                                margin: 0;
                                text-align: center;
                                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                            }
                            .verifiction-code {
                                padding: 12px;
                                font-size: 28px;
                                border-radius: 10px;
                                width: fit-content;
                                background-color: rgb(4, 255, 0);
                                text-decoration: none;
                                color: white;
                                transition: .3s;
                            }
                            .verifiction-code:hover {
                                background-color: rgb(3, 204, 0);
                                text-decoration: underline;
                            }
                        </style>
                </head>
                <body>
                    <div style="background-color: rgb(4, 255, 0);border-radius: 25px;width: 200px;height: 200px;">
                        <img 
                            src="https://res.cloudinary.com/da8txs4co/image/upload/v1699382162/AM-Store-Logo.png" 
                            alt="AM-Store-Logo"
                            style="width: 100%;height: 100%;"
                        >
                    </div>
                    <h1>Wellcome to AM Store ${userName}</h1>
                    <p style="font-size: 23px;margin: 0px;">
                        Hi ${userName}, Thank you for registering in our store.
                    </p>
                    <p style="font-size: 19px;margin: 0px;">
                        Here is your verification code, copy it and go back to verification page on AM Store and paste the code in the specified field
                    </p>
                    <button 
                        class="verifiction-code"
                        onclick="navigator.clipboard.writeText('${verificationCode}')"
                    >
                        ${verificationCode}
                    </button>
                </body>
            </html>
    `
};