const {Sequelize} = require('sequelize');

// const mysql = require('mysql2');
// const{express} = require('express');

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
        //
        // res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        // res.setHeader('Pragma', 'no-cache');
        // res.setHeader('X-Content-Type-Options', 'nosniff');

        if(req.method==="GET"){
            try{
                const contentType = req.headers['content-type'];
                if (contentType) {
                    return res.status(400).send();
                 }

            //    console.log(req.params)
                if(Object.keys(req.query).length>0 || Object.keys(req.body).length>0 || Object.keys(req.params).length>0){
                    res.status(400).send();
                   // console.log(req.params)
                    return;
                }
       //         console.log(process.env.DB_USERNAME);

                await sequelize.authenticate();

                res.status(200).send();
                    const methodAllowed = async(req,res)=>{

        if(req.method==="GET"){
            try{
                const contentType = req.headers['content-type'];
                if (contentType) {
                    return res.status(400).send();
                 }

            //    console.log(req.params)
                if(Object.keys(req.query).length>0 || Object.keys(req.body).length>0 || Object.keys(req.params).length>0){
                    res.status(400).send();
                 //   console.log(req.params)
                    return;
                }
       //         console.log(process.env.DB_USERNAME);
                logger.debug("User is about to get data")
                await sequelize.authenticate();

                res.status(200).send();
                logger.info(`Succefully connected to Database`)

            }catch(error){

                res.status(503).send();
            }
        }else{
            logger.error(`Connection to Database Failed`)
            res.status(405).send();
           

        }
    };
            }catch(error){

                res.status(503).send();
            }
        }else{
           
            res.status(405).send();
            logger.error(`Connection to Database Failed`)
        }
    };

    module.exports = {
        // getConnection,
        sequelize,
        methodAllowed,
};






