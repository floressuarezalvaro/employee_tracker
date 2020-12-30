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
    startPrompt()
});

const startPrompt = () => {
    inquirer
    .prompt({
        name: 'actions',
        type: 'list',
        message: 'Which of these choices would you like to accomplish?',
        choices: [
            'View All Employees',
            'View All Employees by Manager',
            'View All Roles',
            'View Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee role',
            'Update Employee Manager',
            'Exit'
        ],
    })
    .then((answer) => {
        switch (answer.actions) {
            case 'View All Employees':
                viewEmps();
                break;
            case 'View All Employees by Manager':
                viewEmpsByManager();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View Departments':
                viewDeps();
                break;
            case 'Add Employee':
                addEmps();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDeps();
                break;
            case 'Update Employee role':
                updateRoles();
                break;
            case 'Update Employee Manager':
                updateEmpManager();
                break;
            case 'Exit':
                connection.end();
                break;
            default:
                console.log("Oops, we did not register your answer, try again.")
                startPrompt()
                break;
        }
    });
}

const viewEmps = () => {
    console.log("You selected: View All Emps")
}

const viewEmpsByManager = () => {
    console.log("You selected: View All Employees by Manager")
}

const viewRoles = () => {
    console.log("You selected: View All Roles")
}

const viewDeps = () => {
    console.log("You selected: viewDeps")
}

const addEmps = () => {
    console.log("You selected: addEmps")
}

const addRoles = () => {
    console.log("You selected: addRoles")
}

const addDeps = () => {
    console.log("You selected: Add Department")
}

const updateRole = () => {
    console.log("You selected: updateRoles")
}

const updateEmpManager= () => {
    console.log("You selected: updateEmpManager")
}