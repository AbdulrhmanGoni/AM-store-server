export const userDefaultProjection = { userEmail: 1, avatar: 1, userName: 1 }

export const productDataTypes = {
    basic: { earnings: 0, updatedAt: 0, sold: 0 },
    summary: {
        title: 1,
        series: 1,
        images: 1,
        description: 1,
        price: 1,
        category: 1,
        discount: 1
    },
    title: { title: 1 },
    images: { images: 1 }
}