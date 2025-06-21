const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(email, password);
        const [rows] = await db.query(`
      SELECT user_id, username, email, role FROM Users
      WHERE email = ? AND password_hash = ?
    `, [email, password]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = rows[0];

        // Store user info in session
        req.session.user = {
            id: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        // Return role-based redirect information
        res.json({
            message: 'Login successful',
            user: user,
            redirect: user.role === 'owner' ? '/owner-dashboard.html' : '/walker-dashboard.html'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: 'Logout successful' });
    });
});

// Check authentication status
router.get('/status', (req, res) => {
    if (req.session.user) {
        res.json({
            authenticated: true,
            user: req.session.user
        });
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router; 