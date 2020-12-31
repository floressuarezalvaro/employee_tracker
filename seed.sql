USE employeeTracker_db;

INSERT INTO department (name)
VALUES ("Executive"), ("Account Management"), ("Engineering"), ("Marketing"), ("Sales"), ("Customer Support");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Executive Officer", "1500000.00", "1"), ("Chief Operations Officer", "1000000.00", "1"), ("Chief Technology Officer", "1000000.00", "1"), ("Jr. Account Manager", "60000.00", "2"), ("Sr. Account Manager", "90000.00", "2"), ("Manager, Sr. Account Manager", "120000.00", "2"), ("Front-End Developer", "90000.00", "3"), ("Full-Stack Developer", "120000.00", "3"), ("Sr. Engineering Manager", "150000.00", "3"), ("Marketing Specialist", "60000.00", "4"), ("Marketing Analyst", "90000.00", "4"), ("Director of Marketing", "120000.00", "4"), ("Sales Development Rep.", "60000.00", "5"), ("Account Executive", "90000.00", "5"), ("Sales Manager", "120000.00", "5"), ("Customer Support Rep.", "60000.00", "6"), ("Sr. Customer Support Rep.", "90000.00", "6"), ("Customer Support Manager", "120000.00", "6");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Alvy", "Flores Suarez", "1", NULL), ("Yesy", "Flores Suarez", "2", "1"), ("Evon", "Flores Suarez", "3", "1"), ("Vita", "Clarke", "6", "2"), ("Alexey", "Opsal", "9", "3"), ("Rebecca", "Shadows", "12", "2"), ("Julian", "Naz", "15", "1"), ("Holly", "Heyo", "18", "2"), ("Sotero", "Picard", "5", "4"), ("Michael", "Lyons", "8", "5"), ("Sierra", "Li", "11", "6"), ("Wen", "Lam", "14", "7"), ("Matt", "Lam", "17", "8"), ("Michael", "Lupo", "4", "4"), ("Tsion", "Adefers", "7", "5"), ("Chanel", "Liang", "10", "6"), ("Brian", "Kro", "13", "7"), ("Beverly", "Gaite", "16", "8");

SELECT emp.id, emp.first_name AS 'First Name', emp.last_name AS 'Last Name', mgr.first_name AS 'Manager First Name', role.title AS 'Role Title', department.name AS 'Department Name' FROM employee emp
LEFT JOIN employee mgr ON emp.manager_id = mgr.id
INNER JOIN role ON (emp.role_id = role.id)
INNER JOIN department ON (department.id = role.department_id)