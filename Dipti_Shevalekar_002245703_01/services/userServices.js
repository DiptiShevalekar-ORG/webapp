const users = require('../models/userModel');
const bcrypt = require('bcrypt');

const logger = require('../weappLogs');

async function createUser(req, res) {
  //  console.log(req.body)
    try {
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

    const updateFirstName = req.body.FirstName;
    const updateLastName = req.body.LastName;

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

       // await users.save()
        //updatedUser.save()
        logger.debug(`Updated User`)

        return updatedUser
    }

}

async function verifyEmail(req,res){

    console.log("This is verify email function")
    const token = req.query.token; 

    const user = await users.findOne({ where: { id:token } });
    if (!user) {
      return res.status(400).send('Invalid token');
    }
    const TimeNow = new Date();
    const Emailtime = new Date(user.EmailSentTime); 
    console.log(Emailtime)
    const checkDifference = now.getTime() - Emailtime.getTime();
    const checkif2mins = checkDifference / (1000 * 60);
   // const verificationSentAt = users.EmailSentTime;    
   // const diffInMinutes = (TimeNow - Emailtime) / 1000 / 60;
  
    if (checkif2mins > 2) {
      return res.status(400).json({msg:"Time taken more than 2 mins"});
    }
    user.LinkClickedTime = TimeNow;
    user.isVerified = true;
    await user.save();
   // users.LinkClickedTime = TimeNow;
    //await user.save();
    res.send('Email verified successfully. Your account is now activated.');
    res.status(200).send("authorized")
}

module.exports = {
    createUser,
    getAuth,
    updateUser,
    verifyEmail
};