const connection = require("mysql2");
const users = require('../models/userModel');

const getAuthorization = async (req, res, next) => {
    try {
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

        //console.log("after Split and buffer ====" + username)
        //console.log("after split and bcrypt ===" + password)

        const user = await users.findOne({where: {UserName: username}});

        //console.log("Found user get auth::::::::::::::::::::::: " + user.dataValues.UserName);
      //  console.log(user)
        const trialvalidpass = await user.validPassword(password);
        // console.log("TrialValid Password :: " + trialvalidpass)

        // if(user.dataValues.Password === password ){
        //     console.log(" matches with the database value for password ")
        // }
        if (!trialvalidpass) {

           // console.log("ValidPassword ======= " + password)
            const error = new Error('Not Authenticated');

            return res.status(401).end()
            //console.log(password)
            //throw error;
        }

        req.user = user
        //  res.status(200);
        next();

    } catch (error) {
        //next(error);
        return res.status(401).end()

    }
};
module.exports = {
    getAuthorization
}
