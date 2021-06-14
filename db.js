const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'mydb',         // Base name
    'postgres',     // User name
    '32167',     // password
    {
        host: 'localhost',
        // port: '7348',
        dialect: 'postgres'
    }
)