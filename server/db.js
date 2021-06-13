const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "32167",
  host: "localhost",
//   port: 5432,
  database: "mydb"
});

module.exports = pool;