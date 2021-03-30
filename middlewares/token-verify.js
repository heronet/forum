const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.decryptedToken = decryptedToken;
        next();
    } catch (error) {
        return res.status(401).json({success: false, msg: "Access Denied"});
    }
}