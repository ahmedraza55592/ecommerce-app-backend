const jwt = require('jsonwebtoken');
const User = require("../models/user");

const admin = async (req, rest, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return rest.status(401).json({ msg: "No auth token, access denied" });

        }
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        if (!verified) {
            return rest.status(401).json({ msg: "Token verification failed, authorization denied" });

        }
        const user = await User.findById(verified.id);
        if (user.type == "user" || user.type == "seller") {
            return rest.status(401).json({ msg: "You are not an admin!!" });
        }
        req.user = verified.id;
        req.token = token;
        next();

    } catch (e) {
        rest.status(500).json({ err: e.message });

    }
}

module.exports = admin;