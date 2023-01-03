const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Kikitata147',
    database: 'expenses_tracker',
    port: 3306
}

const connection = mysql.createConnection(mysqlConfig);

app.listen(3000, () => console.log('Server is ONLINE'));