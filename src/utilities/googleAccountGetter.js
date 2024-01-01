import messageResponse from "./messageResponse.js";

export default async function googleAccountGetter(googleUserCredentials = {}) {
    const GOOGLE_API = "https://www.googleapis.com/oauth2/v3/userinfo";
    try {
        const { token_type, access_token } = googleUserCredentials;
        const headers = { Authorization: `${token_type} ${access_token}` };
        const userinfo = await fetch(GOOGLE_API, { headers }).then(res => res.json());
        const success = userinfo?.name && userinfo?.email
        return success ? { ok: true, googleResponse: userinfo } : messageResponse("Not found google account");
    } catch (error) {
        console.log(error)
        return { googleResponse: messageResponse(error.error) }
    }
}