export default async function checkEmailExistance(email) {
    try {
        const query = `?email=${email}&api_key=${process.env.VERIFY_EMAIL_API_KEY}`;
        const url = `https://api.hunter.io/v2/email-verifier${query}`;
        const response = await fetch(url)
            .then(res => res.json())
            .then(response => response?.data?.status === "valid")

        return response
    } catch (error) {
        console.log(error)
        return null;
    }
}