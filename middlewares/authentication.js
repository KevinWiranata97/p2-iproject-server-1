const { User } = require('../models');
const {verifyToken} = require('../helpers/jwt')
 
async function authentication(req,res,next){

    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: "Unauthorized" };
        }
        const decoded = verifyToken(access_token)
        if (!decoded) {
            throw { name: "Unauthorized" };
        }

        const findUser = await User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email,
            },
        });
        if (!findUser) {
            throw { name: "Unauthorized" };
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        next();
    } catch (error) {
        console.log(error);
        if (error.name === "Unauthorized") {
            res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Invalid token" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }


    
}

module.exports = authentication