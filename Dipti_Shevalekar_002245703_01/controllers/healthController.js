const {Sequelize} = require('sequelize');
const logger = require('../weappLogs')
const sequelize = new Sequelize(

    process.env.DATABASE,
    process.env.DB_USERNAME,
    process.env.PASSWORD,
    {
        dialect: "mysql",
        host: process.env.HOST
    }
);
    const methodAllowed = async(req,res)=>{
        

        if(req.method==="GET"){
            try{
                logger.info(`This is the host for method check - ${process.env.HOST}`)
                console.log(`this is env = ${process.env.NODE_ENV}`)
                const contentType = req.headers['content-type'];
                if (contentType) {
                    return res.status(400).send();
                 }

                if(Object.keys(req.query).length>0 || Object.keys(req.body).length>0 || Object.keys(req.params).length>0){
                    logger.error(`query or params or body present in the request `)
                    res.status(400).send();
               
                    return;
                }
    

                await sequelize.authenticate();
                logger.info(`health check successfull`)
                res.status(200).send();
                    const methodAllowed = async(req,res)=>{

        if(req.method==="GET"){
            try{
                const contentType = req.headers['content-type'];
                if (contentType) {
                    logger.error(`error in healthchek`)
                    return res.status(400).send();
                 }

                if(Object.keys(req.query).length>0 || Object.keys(req.body).length>0 || Object.keys(req.params).length>0){
                    logger.error(`query or params or body present in the request `)
                    res.status(400).send();
               
                    return;
                }
      
                logger.debug("User is about to get data")
                await sequelize.authenticate();

                res.status(200).send();
                logger.info(`Succefully connected to Database`)

            }catch(error){
                logger.error(`mysql server was down or turned off`)
                res.status(503).send();
            }
        }else{
            logger.error(`Connection to Database Failed`)
            res.status(405).send();
           

        }
    };
            }catch(error){
                logger.error(`mysql server was down or turned off`)
                res.status(503).send();
            }
        }else{
           
            res.status(405).send();
            logger.error(`Connection to Database Failed`)
        }
    };

    module.exports = {
  
        sequelize,
        methodAllowed,
};






