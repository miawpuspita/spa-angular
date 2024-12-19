const roleMiddleware = (requiredRole) => {
    return (req, res, next) =>{
        // jika role pengguna sesuai
        if (req.user && req.user.role === requiredRole){
            next();
        }else{
            res.status(403).json({
                message: "Access denied"
            });
        }
    }
}

module.exports = roleMiddleware;


