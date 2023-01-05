const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const { config } = require('dotenv');

require('dotenv').config();

app.use(express.json());
app.use(cors());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}

const connection = mysql.createConnection(mysqlConfig);

// app.get('/expenses/:id', (req, res) => {
//     connection.execute('SELECT * FROM expenses WHERE userId=?', [req.params.id], (err, result) => {
//         res.send(result);
//     });
// });

app.get('/expenses', (req, res) => {
    const { userId } = req.query;
    connection.execute('SELECT * FROM expenses WHERE userId=?', [userId], (err, result) => {
        res.send(result);
    });
});

app.post('/expenses', (req, res) => {
    const { type, amount, userId } = req.body;

    connection.execute('INSERT INTO expenses (type, amount, userId) VALUES(?, ?, ?)', [type, amount, userId], () => {
        connection.execute('SELECT * FROM expenses WHERE userId=?', [userId], (err, result) => {
            res.send(result);
        });
    });
});



app.listen(8080, () => console.log('Server is ONLINE'));