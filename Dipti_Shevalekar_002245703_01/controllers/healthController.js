const {Sequelize} = require('sequelize');

// const mysql = require('mysql2');
// const{express} = require('express');


const sequelize = new Sequelize(

    process.env.DATABASE,
    process.env.DB_USERNAME,
    process.env.PASSWORD,
    {
        dialect: "mysql",
        host: process.env.HOST
    }
);

// const getConnection = async (req,res) =>  {
//
//     if(Object.keys(req.query).length !== 0 || Object.keys(req.body).length !== 0 || Object.keys(req.params).length !== 0)
//         {
//             res.status(400)
//         }
//         try{
//             await sequelize1.authenticate()
//             res.status(200)
//                 .setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
//                 .setHeader('Pragma', 'no-cache')
//                 .setHeader('X-Content-Type-Options', 'nosniff')
//                 .send();
//         }
//         catch (err){
//             res.status(503)
//         }
//     };

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
                    console.log(req.params)
                    return;
                }
       //         console.log(process.env.DB_USERNAME);

                await sequelize.authenticate();

                res.status(200).send();

            }catch(error){

                res.status(503).send();
            }
        }else{
            res.status(405).send();
        }
    };

    module.exports = {
        // getConnection,
        sequelize,
        methodAllowed,
};






