export default function createProjection(customParams, { withId = true, customValue, except = [] } = {}) {
    let kyesArray = customParams?.split(",");
    const returnType = withId === null ? {} : { _id: withId };
    if (kyesArray) {
        for (const key of kyesArray) {
            let rejected = key[0] === "_";
            if (!except.includes(key)) {
                returnType[rejected ? key.slice(1) : key] = customValue ?? !rejected;
            }
        }
    }
    return returnType;
}
