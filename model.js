const sequelize = require('./db');
const {DataTypes} = require('sequelize');   // We use it for 'types'

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    right: {type: DataTypes.INTEGER, defaultValue: 0},
    wrong: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Price = sequelize.define('price', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    ad: {type: DataTypes.STRING, unique: true},
    price: {type: DataTypes.INTEGER },
    hot: {type: DataTypes.INTEGER}
})

// module.exports = User;
module.exports = Price;