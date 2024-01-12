
export default function extractAuthFromRequestHeaders(requestObject) {
    const accessToken = requestObject.headers["authorization"] ?? "";
    return {
        accessToken: accessToken.split(" ")[1]
    }
};
