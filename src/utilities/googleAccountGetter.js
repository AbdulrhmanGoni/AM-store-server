export default async function googleAccountGetter(googleUserAccessToken) {
    const GOOGLE_API = "https://www.googleapis.com/oauth2/v3/userinfo";
    try {
        const { token_type, access_token } = googleUserAccessToken;
        const headers = { Authorization: `${token_type} ${access_token}` };
        const userinfo = await fetch(GOOGLE_API, { headers }).then(res => res.json());
        const success = userinfo?.name && userinfo?.email
        return success ? userinfo : null;
    } catch (error) {
        console.log(error)
        return;
    }
}