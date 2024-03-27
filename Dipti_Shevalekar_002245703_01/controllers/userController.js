const { Sequelize } = require("sequelize");
const { createUser, getAuth, updateUser, verifyEmail } = require("../services/userServices");
const logger = require("../weappLogs");

const users = require('../models/userModel');
if(process.env.NODE_ENV != "test" ){
const { PubSub } = require('@google-cloud/pubsub');
var pubsub = new PubSub({ projectId: 'cloudassignment03-413923' });

}
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
  }
);

const userMethod = async (req, res) => {
  try {
   console.log(`this is env = ${process.env.NODE_ENV}`)
    const user = await createUser(req, res);
  
    console.log("reached after create user")
   if(process.env.NODE_ENV != "test" ){
   
    const topicName = "verify_email";
    console.log("topic name later")
    console.log(user.id)
    const currdate = new Date()
    const message = {id: user.id, userName: user.UserName, timestamp: currdate };

    console.log("eeffewrfewrgergaergrgerg")
    const dataBuffer = Buffer.from(JSON.stringify(message));
    console.log("reached after data budffer")

    await pubsub.topic(topicName).publishMessage({data:dataBuffer});
    console.log("Pubsub later")

  }

    logger.info(`${user.id} with Username = ${user.UserName} is successfully created` );

    console.log("reached after pubsub user")

    return res.status(201).json({
      id: user.id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      UserName: user.UserName,
      account_updated: user.account_updated,
      account_created: user.account_created,
     });
   
  } catch (error) {
    
    if (error.name == "SequelizeValidationError") {
        console.log("SequelizeValidationError")
      logger.error(`${error.name}`);
      return res.status(400).json({ msg: error.errors[0].message });
    } else if (error.name == "SequelizeUniqueConstraintError") {
       console.log(error)
      logger.error(`${error.name}`);
      return res.status(409).json(error.errors[0].message);
    } else {
      logger.error(`${error.name}`);
      return res.status(400).send();
    }

  }
};

const authenticationFound = async (req, res) => {
  logger.debug("Recieved Authentication Request");
  if (req.headers["content-length"]?.length > 0) {
    res.status(400).json("Request can not have body");
    logger.error(`Authentication failed for  ${users.id}`);
  } else {
    await getAuth(req, res);
  }
};

const updateUserControllerMethod = async (req, res) => {
  logger.debug(`User Logged in to Update the account`);
  try {
    const UpdatedUserDetails = await updateUser(req, res);
    //    console.log("UpdatedUserDetails"+UpdatedUserDetails)
    res.status(204).json();
    logger.info(`${user.id} Updated User Data`);
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      logger.error(`${error.name}`);
      return res.status(400).json(error.errors[0].message);
    } else if (error.name == "SequelizeUniqueConstraintError") {
      logger.error(`${error.name}`);
      return res.status(409).json(error.errors[0].message);
    } else {
      logger.error(`${error.name}`);
      return res.status(400).send();
    }
  }
};

const emailVerification = async (req, res) =>{
  try{
    console.log("this is time")

    console.log(req.query)

     await verifyEmail(req,res);
   // console.log(result);
    //res.status(200).send("authorized")
    //response.status(result.code).json(result.msg);
}catch(error){
    console.log("this is error block")
   // res.status(400).json({msg:"unauthorized"});
  }
}   
  

  // const user =  await verifyEmail(req, res);
  //  return req.status(200).send(`${user.UserName} verified successfully`)


const methodNotAllowed = (req, res) => {
  logger.error(`Invalid Request by user ${user.UserName}`);
  res.status(405).send();
};

module.exports = {
  userMethod,
  authenticationFound,
  updateUserControllerMethod,
  methodNotAllowed,
  emailVerification
};
