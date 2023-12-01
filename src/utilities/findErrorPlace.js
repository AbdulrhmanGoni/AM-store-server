
export default function findErrorPlace(ErrorStack) {
    const result = ErrorStack.match(/(?<=\bat\s)\w+(?=\s\(file:\/\/\/)/g);
    return result ? result[0] : result
}
