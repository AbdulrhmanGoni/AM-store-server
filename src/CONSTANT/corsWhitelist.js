const corsWhitelist = []

if (process.env.NODE_ENV === "development") {
    corsWhitelist.push(...[
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:3001'
    ])
} else {
    corsWhitelist.push(
        process.env.AM_STORE_CLIENT_SITE_HOST,
        process.env.AM_STORE_ADMIN_PANEL_HOST
    )
}

export default corsWhitelist