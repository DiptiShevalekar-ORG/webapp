const users = require('../models/userModel');
const bcrypt = require('bcrypt');

const logger = require('../weappLogs');

async function createUser(req, res) {
  //  console.log(req.body)
    try {
      logger.info(`This is the host for creating user - ${process.env.HOST}`)
        const allowedFields = ["FirstName", "LastName", "Password", "UserName"];
        const additionalFields = Object.keys(req.body).filter(
            (field) => !allowedFields.includes(field)
        );
        if (additionalFields.length == 0) {
          //  console.log("Reached to services")
          const { FirstName, LastName, Password, UserName } = req.body;
          if (FirstName && LastName && Password && UserName && Password.trim() !== "") {
           
            const userdetails = req.body
         //   console.log("Unhashed Password " + userdetails.Password)
            userdetails.Password = bcrypt.hashSync(userdetails.Password, 10);
            const user = await users.create(
                userdetails
            );
         //   console.log(user)
            return user
          }
          else{
            logger.warn(`User tried creating account with empty fields- The account was not created`)
            throw new Error(`Cannot add empty fields`)
          }
        } else {
            logger.error(`User tried creating invalid field- ${additionalFields}`)
            res.status(400).send(`Can not create ${additionalFields}`)
            throw new Error()
        }
    } catch (error) {
        console.log("NEWWWWWWWWWWWWWWW")
        throw error
    }
}

async function getAuth(req, res) {

    logger.info(`${req.user.UserName} logged in`)
    return res.status(200).json({
        id: req.user.id,
        FirstName: req.user.FirstName,
        LastName: req.user.LastName,
        account_updated: req.user.account_updated,
        account_created: req.user.account_created
    })
}

async function updateUser(req, res) {
  logger.info(`This is the host for updating user - ${process.env.HOST}`)
    const updateFirstName = req.body.FirstName;
    const updateLastName = req.body.LastName;
  logger.info(`this is host handling update user - ${process.env.HOST}`)
    const allowedFields = ["FirstName", "LastName", "Password"];

    const additionalFields = Object.keys(req.body).filter(
        (field) =>
            !allowedFields.includes(field)
        //  return field

    );
    if (additionalFields.length > 0) {
    logger.error(`User tried updating invalid field- ${additionalFields}`)
    return res.status(400).send(`Can not update ${additionalFields}`)
        // return res.status(400).send()
   //   return new Error("errrorrrrooorrrrrr")

    } else {
      //  console.log("Users :::  --  --- " + users)

       const updatedUser = await users.update({
           FirstName : updateFirstName,
           LastName : updateLastName,
           Password : bcrypt.hashSync(req.body.Password, 10)
        },
        {
            where: {
                UserName: req.user.UserName
            },
            returning:true
        })

        logger.debug(`Updated User`)

        return updatedUser
    }

}

async function verifyEmail(token) {
    try {
      const user = await users.findOne({ where: { id: token } });
      logger.info(`this is host handling email verification - ${process.env.HOST}`)
      if (!user) {
        return false;
      }
  
      const currentTime = new Date();
      const emailSentTime = new Date(user.EmailSentTime);
      const timeDifferenceMinutes = (currentTime.getTime() - emailSentTime.getTime()) / (1000 * 60);
  
      if (timeDifferenceMinutes > 2) {
        return false; 
      }
  
      user.LinkClickedTime = currentTime;
      user.isVerified = true;
      await user.save();
  
      return true;
    } catch (error) {
      console.error("Error during email verification:", error);
      throw error; // Propagate the error to the caller (controller)
    }
  }

module.exports = {
    createUser,
    getAuth,
    updateUser,
    verifyEmail
};