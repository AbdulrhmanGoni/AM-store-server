export default function createProjection(customParams) {
    let kyesArray = customParams?.split(",");
    const returnType = { _id: true };
    if (kyesArray) {
        for (const key of kyesArray) {
            let rejected = key[0] === "_";
            returnType[rejected ? key.slice(1) : key] = !rejected;
        }
    }
    return returnType;
}
