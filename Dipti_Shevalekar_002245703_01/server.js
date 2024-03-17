//server.js

const express = require("express");
require('dotenv').config();
const routes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser')
const connection = require('mysql2')
const {methodAllowed, sequelize} = require("./controllers/healthController");
const app = express();
const port = process.env.PORT;

const expressWinston = require('express-winston')
const { transports, format } = require('winston')


const logger = require('./weappLogs')
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))


app.use(bodyParser.json());

app.use(async(req,res, next) =>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    try{
        await sequelize.authenticate()
        next()
    }catch(err){
        // if (err.name === 'SequelizeConnectionError' && err.parent && err.parent.code === 'ER_BAD_DB_ERROR') {
        //     console.log('Database does not exist. Attempting to create...');
        //     try {
        //         await sequelize.query(`CREATE DATABASE ${process.env.DATABASE};`);
        //      //   console.log('Database created successfully.');
        //     } catch (createError) {
        //         console.error('Error creating database:', createError);
        //     }
        // } else {
        //     console.error('Unable to connect to the database:', err);
        // }

        res.status(503).end()
        //next()

    }
})

app.use(async(req,res,next)=>{
   if( Object.keys(req.query).length !== 0 ||+ Object.keys(req.params).length !== 0){
       res.status(400).end()
   }else{
       next()
   }
})

app.use('/healthz', routes);
//app.use('/user/self', userRoutes);
app.use('/v1/user', userRoutes);

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.raw({limit: '50mb', type: () => true}));

app.listen(port, () => {

    console.log(`Server : http://localhost:${port}`);

});

module.exports = app;