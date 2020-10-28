DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT(10) NOT NULL,
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT, 
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department(name)
VALUES
    ("Management"),
    ("Marketing"),
    ("IT and Development"),
    ("Legal"),
    ("Finance"),
    ("Logistics"),
    ("Project Management"),
    ("Human Resources"),
    ("Operations"),
    ("Customer Service"),
    ("Sales"),
    ("Product");

INSERT INTO role(title, salary, department_id)
VALUES  
    ("Executive", 200, 1),
    ("Manager", 100, 1),
    ("Project Manager", 75, 7),
    ("Business Analyst", 80, 9),
    ("Sales Representative", 50, 11),
    ("Customer Service Represenative", 40, 10),
    ("Administrative Assistant", 100, 1),
    ("Marketing Analyst", 60, 2),
    ("Developer", 100, 3),
    ("Product Manager", 90, 12),
    ("Human Resources Manager", 75, 8),
    ("Financial Analyst", 50, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
    ("Gary", "KillsSpiders", 9, 2),
    ("Jared", "Seefried", 4, 1),
    ("Will", "Ferrell", 1, 1 ),
    ("Nora", "BoBora", 5, 3),
    ("Taylor", "Analyst", 12, 2);