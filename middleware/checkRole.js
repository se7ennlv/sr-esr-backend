module.exports.isSuperAdmin = (req, res, next) => {
    const { role_id } = req.user;

    if (role_id == 1) {
        next();
    } else {
        return res.status(403).json({
            error: {
                message: 'Only super admin'
            }
        });
    }
}