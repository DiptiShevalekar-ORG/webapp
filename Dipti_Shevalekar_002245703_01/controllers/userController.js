//usercontroller.js

const {Sequelize} = require('sequelize');
const {createUser, getAuth, updateUser} = require('../services/userServices');
const logger = require('../weappLogs')
//const users = require('../models/userModel');

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USERNAME,
    process.env.PASSWORD,
    {
        dialect: "mysql",
        host: process.env.HOST
    }
);
// const getConnection = async (req, res) => {
//     try {
//         await sequelize.authenticate()
//         res.status(200)
//             .setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
//             .setHeader('Pragma', 'no-cache')
//             .setHeader('X-Content-Type-Options', 'nosniff')
//             .send();
//     } catch (err) {
//         res.status(503)
//     }
// }

const userMethod = async (req, res) => {
    try {
      const user =  await createUser(req, res);
      logger.info(`${user.id} with Username = ${user.UserName} is successfully created`)
        return res.status(201).json({
            id: user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            UserName : user.UserName,
            account_updated: user.account_updated,
            account_created: user.account_created
        })

    } catch (error) {
        if (error.name == "SequelizeValidationError") {
            //  console.log("SequelizeValidationError")
            return res.status(400).json({msg: error.errors[0].message})
        } else if (error.name == "SequelizeUniqueConstraintError") {
            console.log(error)
            return res.status(409).json(error.errors[0].message)
        } else {
            return res.status(400).send()
        }
        //  console.error(error);
    }
    // console.log("Reached to controllers")
    // if (req.method === "GET") {
    //
    //
    // } else if (req.method === "POST") {
    //
    //     await userServices.createUser(req, res);
    //
    // } else if (req.method === "PUT") {

    // try {
    //     const {firstName, lastName, password} = req.body;
    //     const userId = req.user.id;
    //
    //     const user = await User.findByPk(userId);
    //     if (!user) {
    //         return res.status(404).json({error: 'User not found'});
    //     }
    //
    //     user.firstName = firstName;
    //     user.lastName = lastName;
    //     user.password = await bcrypt.hash(password, 10);
    //     user.account_updated = new Date();
    //     await user.save();
    //
    //     const responseUser = {...user.toJSON()};
    //     delete responseUser.password;
    //
    //     res.status(200).json(responseUser);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({error: 'Internal Server Error'});
    // }
    // }
};


const authenticationFound = async (req, res) => {

        if(req.headers["content-length"]?.length>0 ){
          res.status(400).json("Request can not have body")
          logger.error(`Authentication failed for  ${user.id}`)
        }else{
            await getAuth(req, res)
        }
}

const updateUserControllerMethod = async (req, res) => {

    try {
       const UpdatedUserDetails =  await updateUser(req, res)
    //    console.log("UpdatedUserDetails"+UpdatedUserDetails)
        res.status(204).json()
        logger.info(`${user.id} Updated User Data`)

    } catch (error) {

        if (error.name == "SequelizeValidationError") {
            logger.error(`${error.name}`) 
            return res.status(400).json(error.errors[0].message)
          
        } else if (error.name == "SequelizeUniqueConstraintError") {
            logger.error(`${error.name}`) 
            return res.status(409).json(error.errors[0].message)
        } else {
            logger.error(`${error.name}`) 
            return res.status(400).send()
        }
    }
}

const methodNotAllowed = (req, res) => {
    logger.error(`Invalid Request by user ${user.UserName}`) 
    res.status(405).send()
}

module.exports = {
    userMethod,
    authenticationFound,
    updateUserControllerMethod,
    methodNotAllowed,
};