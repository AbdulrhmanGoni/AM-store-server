
export default function extractAuthFromRequestHeaders(requestObject) {
    const accessToken = requestObject.headers["authorization"] ?? "";
    return {
        tokenId,
        accessToken: accessToken.split(" ")[1]
    }
};
