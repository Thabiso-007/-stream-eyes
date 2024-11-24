const pool = require('../../config/db');

const testDB = async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()'); 
        res.json({ success: true, message: 'Database connected!', timestamp: result.rows[0].now });
      } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ success: false, error: 'Failed to connect to database.' });
      }
}

module.exports = testDB;