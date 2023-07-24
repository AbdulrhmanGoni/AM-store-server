
const products = {
    rate: {
        avrage: function () {
            let allRates = this.rate.raters.reduce((acc, current) => acc + current.userRating, 0);
            let ratesCount = this.rate.raters.length;
            let avrage = allRates / ratesCount;
            return avrage ? avrage : 0;
        }
    }
}

function name(params) {

}

export {
    products
}