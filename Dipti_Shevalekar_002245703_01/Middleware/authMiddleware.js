const connection = require("mysql2");
const users = require('../models/userModel');

const getAuthorization = async (req, res, next) => {
    try {
        const isTestEnvironment = process.env.NODE_ENV === "test";
        
        // if (!isTestEnvironment && user.isVerified !== "true") {
        //     return res.status(401).send("Your account is not verified");
        // }
  
      if(  users.isVerified == "true") { 
        if (!req.get("Authorization")) {
            const err = new Error('Not Authenticated!');
            res.status(401).set('www-Authenticate', 'Basic');
            throw err;
        }
        const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
            .toString()
            .split(':');

        const username = credentials[0];
        const password = credentials[1];

      

        const user = await users.findOne({where: {UserName: username}});
    
        const trialvalidpass = await user.validPassword(password);
       
        if (!trialvalidpass) {

          
            const error = new Error('Not Authenticated');

            return res.status(401).end()
          
        }

        req.user = user

        next();
 }
    return res.status(401).send("Your account is not verified")

    } catch (error) {
            return res.status(401).end()

    }
};
module.exports = {
    getAuthorization
}
