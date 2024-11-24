const bcrypt = require('bcrypt');

const pool = require('../../config/db');
const generateToken = require('../../helpers/generateToken');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        if (!user.password) {
            return res.status(500).json({ error: 'Password not found for the user' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed due to server error' });
    }
};


const register = async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (username, first_name, last_name, email, password, created_at)
             VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id, username, email`,
            [username, firstName, lastName, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed. Ensure username/email is unique.' });
    }
}

module.exports = { login, register };