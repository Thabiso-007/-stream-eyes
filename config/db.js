const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_CONNETION_URL
})

pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to PostgreSQL database:', err.message);
    } else {
      console.log('Connected to PostgreSQL database successfully.');
      release(); 
    }
});

module.exports = pool