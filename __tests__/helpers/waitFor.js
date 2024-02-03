export default function waitFor(seconds, callback) {
    return new Promise((resolve) => {
        setTimeout(() => {
            callback?.()
            resolve(true)
        }, seconds * 1000);
    })
}