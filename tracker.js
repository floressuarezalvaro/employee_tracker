const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeTracker_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`You are connected. ID = ${connection.threadId}\n`);
    connection.end();
});
  