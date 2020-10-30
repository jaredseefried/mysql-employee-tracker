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
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
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
    ("Executive", 200000, 1),
    ("Manager", 100000, 1),
    ("Project Manager", 75000, 7),
    ("Business Analyst", 80000, 9),
    ("Sales Representative", 50000, 11),
    ("Customer Service Represenative", 40000, 10),
    ("Administrative Assistant", 100000, 1),
    ("Marketing Analyst", 60000, 2),
    ("Developer", 100000, 3),
    ("Product Manager", 90000, 12),
    ("Human Resources Manager", 75000, 8),
    ("Financial Analyst", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
    ("Gary", "KillsSpiders", 9, 2),
    ("Jared", "Seefried", 4, 1),
    ("Will", "Ferrell", 1, 1 ),
    ("Nora", "BoBora", 5, 3),
    ("Taylor", "Analyst", 12, 2),
    ("Claudia", "Flores", 2, 4),
    ("Joe", "Schmoe", 3, 5);
    