export default async function checkEmailExistance(email) {
    const { VERIFY_EMAIL_API, API_KEY } = process.env;
    try {
        const url = `${VERIFY_EMAIL_API}?email=${email}&api_key=${API_KEY}`;
        const response = await fetch(url).then(res => res.json());
        return response.data.status === "valid";
    } catch (error) {
        console.log(error)
        return null;
    }
}