const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const app = express();
const PORT = process.env.PORT || 8080;

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
            'View Employees',
            // 'View Employees by Manager',
            'View Roles',
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
            case 'View Employees':
                viewEmps();
                break;
            // case 'View Employees by Manager':
            //     viewEmpsByManager();
            //     break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Departments':
                viewDeps();
                break;
            case 'Add Employee':
                addEmp();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDep();
                break;
            case 'Update Employee role':
                updateRole();
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
    let query = "SELECT emp.id, emp.first_name AS 'First Name', emp.last_name AS 'Last Name', mgr.first_name AS 'Manager First Name', role.title AS 'Role Title', department.name AS 'Department Name' FROM employee emp ";
    query += "LEFT JOIN employee mgr ON (emp.manager_id = mgr.id) "
    query += "INNER JOIN role ON (emp.role_id = role.id) ";
    query += "INNER JOIN department ON (department.id = role.department_id)";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("<---------------------------------------------->")
        console.table(res)
        console.log("<---------------------------------------------->")
        startPrompt();
    })
}

// const viewEmpsByManager = () => {
//     console.log("You selected: View All Employees by Manager")
// }

const viewRoles = () => {
    connection.query('SELECT * from role', (err, res) => {
        if (err) throw err;
        console.log("<---------------------------------------------->")
        console.table(res)
        console.log("<---------------------------------------------->")
        startPrompt();
    })
};

const viewDeps = () => {
    connection.query('SELECT * from department', (err, res) => {
        if (err) throw err;
        console.log("<---------------------------------------------->")
        console.table(res)
        console.log("<---------------------------------------------->")
        startPrompt();
    })
}

const addEmp = () => {
    inquirer
        .prompt([
            {
                name: 'fName',
                type: 'input',
                message: "What is the employee's first name",
            },
            {
                name: 'lName',
                type: 'input',
                message: "What is the employee's last name",
            },
            {
                name: 'role',
                type: 'input',
                message: "What is the employee's role",
            },
            {
                name: 'mId',
                type: 'input',
                message: "What is the employee's manager ID number",
            }
        ])
        .then((answer) => {
            connection.query(
            "INSERT INTO employee SET ?", 
            {
                first_name: answer.fName, 
                last_name: answer.lName, 
                role_id: answer.role, 
                manager_id: answer.mId
            },
            (err) => {
                if (err) throw err;
                console.log("<---------------------------------------------->")
                console.log("Employee was successfully added")
                console.log("<---------------------------------------------->")
                startPrompt();
            })
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'newRole',
                type: 'input',
                message: "What role would you like to add?",
            },
            {
                name: 'newRoleSalary',
                type: 'input',
                message: "What will be the salary for this role?",
            },
            {
                name: 'newRoleDep',
                type: 'input',
                message: "What department ID does this role belong to?",
            }
        ])
        .then((answer) => {
            connection.query(
            "INSERT INTO role SET ?", 
            {
                title: answer.newRole, 
                salary: answer.newRoleSalary, 
                department_id: answer.newRoleDep
            },
            (err) => {
                if (err) throw err;
                console.log("<---------------------------------------------->")
                console.log("Role successfully added!")
                console.log("<---------------------------------------------->")
                startPrompt();
            })
        });
}

const addDep = () => {
    inquirer
        .prompt([
            {
                name: 'newDep',
                type: 'input',
                message: "What department would you like to add?",
            },
        ])
        .then((answer) => {
            connection.query(
            "INSERT INTO department SET ?", 
            {
                name: answer.newDep
            },
            (err) => {
                if (err) throw err;
                console.log("<---------------------------------------------->")
                console.log("Department successfully added!")
                console.log("<---------------------------------------------->")
                startPrompt();
            })
        });
}

const updateRole = () => {
    inquirer
        .prompt([
            {
                name: 'updateEmp',
                type: 'input',
                message: "What is the employee ID you'd like to update?",
            },
            {
                name: 'updateRole',
                type: 'input',
                message: "What role ID are we switching the previously selected user to?",
            },
        ])
        .then((answer) => {
            connection.query(
            "UPDATE employee SET ? WHERE ?", 
            [{
                role_id: answer.updateRole
            },
            {
                id: answer.updateEmp
            }],
            (err) => {
                if (err) throw err;
                console.log("<---------------------------------------------->")
                console.log("Role successfully updated!")
                console.log("<---------------------------------------------->")
                startPrompt();
            })
        });
}

const updateEmpManager= () => {
    inquirer
        .prompt([
            {
                name: 'updateEmp',
                type: 'input',
                message: "What is the employee ID you'd like to update?",
            },
            {
                name: 'updateManager',
                type: 'input',
                message: "What employee ID of the manager you'd like assigned to this user?",
            },
        ])
        .then((answer) => {
            connection.query(
            "UPDATE employee SET ? WHERE ?", 
            [{
                manager_id: answer.updateManager
            },
            {
                id: answer.updateEmp
            }],
            (err) => {
                if (err) throw err;
                console.log("<---------------------------------------------->")
                console.log("Employee manager successfully updated!")
                console.log("<---------------------------------------------->")
                startPrompt();
            })
        });
}

app.listen(PORT, () =>
    console.log(`Server listening on: http://localhost:${PORT}`)
);