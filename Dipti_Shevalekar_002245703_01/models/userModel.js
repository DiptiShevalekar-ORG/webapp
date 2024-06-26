const {Sequelize, DataTypes} = require("sequelize");
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.PASSWORD, {
    dialect: "mysql",
    host: process.env.HOST
});

const users = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        readOnly: true,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[^\s\W\d]+$/
        }

    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[^\s\W\d]+$/
        }
    },
    UserName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
   
        validate: {
            isEmail: true,
        },
    },
    Password: {
        type: DataTypes.STRING,
        readOnly: true,
        allowNull: false,
    },
    isVerified: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      
    },
    EmailSentTime:{
        type: DataTypes.DATE
    
    },
    LinkClickedTime: {
        type: DataTypes.DATE
  
    }
}, {
    timestamps: true,
    updatedAt: "account_updated",
    createdAt: "account_created",
    

});
users.prototype.validPassword = async function (password) {
 
    const x = await bcrypt.compare(password, this.Password);

    return x;
};


users.sync({force: false})
    .then(() => {
    
        console.log("Table Created");
    })
    .catch((error) => {
        console.log("Table Not Created", error);
    });

module.exports = users;



