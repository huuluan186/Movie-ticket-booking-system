export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Forbidden: Admins only' })
    }
    next()
}

export const isUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ msg: 'Forbidden: Users only' })
    }
    next()
}
