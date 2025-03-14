const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Authentication token not provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid authentication token." });
    }
};

module.exports = authenticate;