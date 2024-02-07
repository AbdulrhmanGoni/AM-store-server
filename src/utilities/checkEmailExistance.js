export default async function checkEmailExistance(email) {
    const { VERIFY_EMAIL_API_KEY } = process.env;
    try {
        const query = `?email=${email}&api_key=${VERIFY_EMAIL_API_KEY}`
        const url = `https://api.hunter.io/v2/email-verifier${query}`;
        const response = await fetch(url)
            .then(res => res.json())
            .then(response => response.data.status === "valid")
            .catch(() => false)

        return response
    } catch (error) {
        console.log(error)
        return null;
    }
}