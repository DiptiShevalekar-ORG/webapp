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
       // pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        validate: {
            isEmail: true,
        },
    },
    Password: {
        type: DataTypes.STRING,
        readOnly: true,
        allowNull: false,
    }
}, {
    timestamps: true,
    updatedAt: "account_updated",
    createdAt: "account_created",
    // hooks: {
    //     beforeCreate: async (user) => {
    //         if (user.password) {
    //             const salt = await bcrypt.genSaltSync(10);
    //             user.password = bcrypt.hashSync(user.password, salt);
    //             console.log("this is insdie the hook"+user.password);
    //         }
    //     },
    //     beforeUpdate: async (user) => {
    //         if (user.password) {
    //             const salt = await bcrypt.genSaltSync(10);
    //             user.password = bcrypt.hashSync(user.password, salt);
    //         }
    //     },
    // }

});
users.prototype.validPassword = async function (password) {
    console.log("Model Password ====" + password);
    console.log("this is the password here: " + this.Password);
    console.log(password);
    //  return password
    const x = await bcrypt.compare(password, this.Password);
    console.log(x);
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



