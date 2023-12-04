const userDataTypes = {
    basic: { userEmail: 1, avatar: 1, userName: 1 },
    avatar: { avatar: 1, _id: 0 },
    initial: { 
        userEmail: 1, 
        avatar: 1, 
        userName: 1, 
        userFavorites: 1, 
        userShoppingCart: 1,
        hisEmailVerified: 1
    },
    _id: { _id: 1 },
    comment: { avatar: 1, userName: 1, _id: 0 },
    comments: { comments: 1, _id: 0 },
    userShoppingCart: { userShoppingCart: 1, _id: 0 },
    userName: { userName: 1, _id: 0 },
    userEmail: { userEmail: 1, _id: 0 },
    userOrders: { userOrders: 1, _id: 0 },
    userFavorites: { userFavorites: 1, _id: 0 },
    addresses: { userAddress: 1, _id: 0 },
    paymentMethodes: { userPaymentMethodes: 1, _id: 0 },
}

const productDataTypes = {
    basic: { earnings: 0, updatedAt: 0, sold: 0 },
    comment: { avatar: 1, userName: 1, _id: 0 },
    images: { images: 1 },
    rating: { rate: 1, _id: 0 },
    summary: { title: 1, series: 1, images: 1, description: 1, price: 1, category: 1 },
    title: { title: 1 },
    id: { _id: 1 }
}


export { userDataTypes, productDataTypes };