export default async function messageResponse(message, status = 400) {
    return {
        status,
        response: { message }
    }
}