import { Model, DataTypes } from 'sequelize';
import sequelize from '../Config/connections';

// create profile picture model
class Profilepic extends Model { }

// create associations
Profilepic.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        profile_pic: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'profilepic'
    }
)

export default Profilepic;