
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create the Artist model
class User extends Model {
    //instance method to check password per artist
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
User.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        location: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: true,
        },

        website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        profile_pic: {
            type: DataTypes.STRING,
            allowNull: true
        },

    },
    {
        hooks: {
            // lifecycle hook to hash PW before creating new artist
            async beforeCreate(usertData) {
                newUsersData.password = await bcrypt.hash(newUsersData.password, 10);
                return newUsersData;
            },
            // lifecycle hook to hash new PW before updating PW
            async beforeUpdate(updatedUsersData) {
                updatedUsersData.password = await bcrypt.hash(updatedUsersData.password, 10);
                return updatedUsersData;
            }
        },

        // TABLE CONFIGURATIONS

        // pass in imported sequelize connection (direct connection to the database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `artist_id` and not `artistId`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;