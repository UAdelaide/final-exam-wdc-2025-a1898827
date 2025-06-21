const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'DogWalkService',
    port: 3306
};

const pool = mysql.createPool(dbConfig);

app.use(express.json());

app.get('/api/dogs', async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        d.name AS dog_name, 
        d.size, 
        u.username AS owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching dogs:', error);
        res.status(500).json({ error: 'Failed to retrieve dogs', details: error.message });
    }
});

app.get('/api/walkrequests/open', async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        wr.request_id,
        d.name AS dog_name,
        wr.requested_time,
        wr.duration_minutes,
        wr.location,
        u.username AS owner_username
      FROM WalkRequests wr
      JOIN Dogs d ON wr.dog_id = d.dog_id
      JOIN Users u ON d.owner_id = u.user_id
      WHERE wr.status = 'open'
    `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching open walk requests:', error);
        res.status(500).json({ error: 'Failed to retrieve open walk requests', details: error.message });
    }
});

app.get('/api/walkers/summary', async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        u.username AS walker_username,
        COUNT(wr.rating_id) AS total_ratings,
        ROUND(AVG(wr.rating), 1) AS average_rating,
        (
          SELECT COUNT(*) 
          FROM WalkRequests w
          JOIN WalkApplications wa ON w.request_id = wa.request_id
          WHERE wa.walker_id = u.user_id 
          AND w.status = 'completed'
          AND wa.status = 'accepted'
        ) AS completed_walks
      FROM Users u
      LEFT JOIN WalkRatings wr ON u.user_id = wr.walker_id
      WHERE u.role = 'walker'
      GROUP BY u.user_id
    `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching walker summary:', error);
        res.status(500).json({ error: 'Failed to retrieve walker summary', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Dog Walk Service API running on port ${port}`);
});