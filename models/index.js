// import models
import User, { hasMany } from './User';
import Profilepic, { belongsTo } from './propic';


// create associations
User.hasMany(Profilepic, {
    foreignKey: 'user_id'
});

Profilepic.belongsTo(User, {
    foreignKey: 'user_id'
});




export default { User, Profilepic };