// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, // ALWAYS 3306
    user: "root",
    password: "Welcome123",
    database: "employeeDB",
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
    addViewUpdate();
});



class Department {
    constructor(name) {
        this.name = name
    }
}

class Role {
    constructor(title, salary, departmentID) {
        this.title = title
        this.salary = salary
        this.departmentID = departmentID
    }
}

class Employee {
    constructor(firstName, lastName, roleID, managerID) {
        this.firstName = firstName
        this.lastName = lastName
        this.roleID = roleID
        this.managerID = managerID
    }
}

function addViewUpdate() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to Add, View or Update a record?",
            name: "addViewUpdate",
            choices: ["Add", "View", "Update"]
        }

    ]).then(selection => {
        switch (selection.addViewUpdate) {
            case "Add":
                addType();
                break;
            case "View":
                viewType();
                break;
            case "Update":
                updateType();

        }
    })
}

function addType() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to Add a Department, Role or Employee?",
            name: "addType",
            choices: ["Department", "Role", "Employee"]
        }
    ]).then (selection => {
        switch (selection.addType){
            case "Department":
                addDepartment()
                break;
            case "Role":
                addRole();
                break;
            case "Employee":
                addEmployee();
        }
    })
}

function viewType() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to View a Department, Role or Employee?",
            name: "viewType",
            choices: ["Department", "Role", "Employee"]
        }
    ]).then((selection) => {
        switch (selection.viewType){
            case "Department":
                viewDepartment();
            case "Role":
                viewRole();
                break;
            case "Employee":
                viewEmployee()
        }
    })
}

function updateType() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to Update a Department, Role or Employee?",
            name: "updateType",
            choices: ["Department", "Role", "Employee"]
        }
    ])
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the Department?",
            name: "deptName",
        }
    ])
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the new role?",
            name: "roleTitle",
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "roleSalary",
        },
        {
            type: "input",
            message: "What is the department ID associated this role?",
            name: "roleDeptID",
        }
    ])
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employees first name?",
            name: "employeeFirst"
        },
        {
            type: "input",
            message: "What is the employees last name?",
            name: "employeeLast"
        },
        {
            type: "input",
            message: "What is the employees role ID?",
            name: "employeeRoleID"
        },
        {
            type: "input",
            message: "What is the employees manager ID?",
            name: "employeeManagerID"
        }
    ])
}

function viewDepartment (){
    connection.query("SELECT * FROM department", (error, response) => {
        if (error) throw error;
        console.table(response)
    })
}

function viewRole (){
    connection.query("SELECT * FROM role", (error, response) => {
        if (error) throw error;
        console.table(response)
    })
}

function viewEmployee (){
    connection.query("SELECT * FROM employee", (error, response) => {
        if (error) throw error;
        console.table(response)
    })
}