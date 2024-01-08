
export default function asyncRouteHandler(asyncFunction) {
    return async (req, res, next) => {
        try {
            await asyncFunction(req, res, next)
        } catch (error) {
            console.log(error)
            res.status(500).json();
        }
    }
}
