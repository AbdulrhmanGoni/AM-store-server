const userDataTypes = {
    basic: { userEmail: true, avatar: true, userName: true },
    avatar: { avatar: true, _id: false },
    initial: { userEmail: true, avatar: true, userName: true, userFavorites: true, userShoppingCart: true },
    _id: { _id: true },
    comment: { avatar: true, userName: true, _id: false },
    comments: { comments: true, _id: false },
    password: { userPassword: true, _id: false },
    userShoppingCart: { userShoppingCart: true, _id: false },
    userName: { userName: true, _id: false },
    userEmail: { userEmail: true, _id: false },
    userOrders: { userOrders: true, _id: false },
    userFavorites: { userFavorites: true, _id: false },
    addresses: { userAddress: true, _id: false },
    paymentMethodes: { userPaymentMethodes: true, _id: false },
}

const productDataTypes = {
    basic: { earnings: false, updatedAt: false, sold: false },
    comment: { avatar: true, userName: true, _id: false },
    images: { images: true },
    rating: { rate: true, _id: false },
    summary: { title: true, avatar: true, series: true, images: true, description: true, price: true, category: true },
    title: { title: true },
    id: { _id: true }
}


export { userDataTypes, productDataTypes };