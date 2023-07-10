const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verify_token = async (req,res,next) => {

    const token = req.body.token || req.query.token || req.headers["authorization"];
    
    if(!token) {
        res.status(400).send({success:false, msg:"A token is required for authorization"})
    }

    try {
     const decodeToken = await jwt.verify(token, config.jwt_token);
     req.user =  decodeToken;
    } catch (error) {
        res.status(200).send("Invalid Token");
    }
   return next();
}

module.exports = verify_token;