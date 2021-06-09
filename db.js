const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'mydb',
    'postgres',
    '32167',
    {
        host: 'localhost',
        // port: '7348',
        dialect: 'postgres'
    }
)