const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'root', // your MySQL password
    database: 'nodejs' // database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log('Database connection error:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

// Sign-up endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into MySQL database
    db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
            if (err) {
                console.log('Error inserting user:', err);
                return res.status(500).send('Server error');
            }
            res.send('User registered successfully');
            // res.json( 'User registered successfully'    );
        }
    );
 
});

// Sign-in endpoint
app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.log('Error fetching user:', err);
            return res.status(500).send('Server error');
        }

        if (result.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = result[0];

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.send('Sign-in successful');
        } else {
            res.status(400).send('Incorrect password');
        }
    });
});

// Serve static files (HTML and CSS)
app.use(express.static('LOGIN'));

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5501');
});
