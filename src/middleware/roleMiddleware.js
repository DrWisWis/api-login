module.exports = function (...allowedRoles) {
    return (req, res, next) => {
        const { role } = req.user;

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({
                message: "Acesso negado. Você não tem permissão."
            });
        }

        next();
    };
};