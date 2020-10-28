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

connection.connect(function(error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
    addViewUpdate();
});

class Department {
    constructor(name){
        this.name = name
    }
}

class Role {
    constructor (title, salary, departmentID){
        this.title = title
        this.salary = salary
        this.departmentID = departmentID
    }
}

class Employee {
    constructor(firstName, lastName, roleID, managerID){
        this.firstName = firstName
        this.lastName = lastName
        this.roleID = roleID
        this.managerID = managerID
    }
}

function addViewUpdate (){
    inquirer.prompt ([
        {
            type: "list",
            message: "Would you like to Add, View or Update a record?",
            name: "addViewUpdate",
            choices: ["Add", "View", "Update"]
        }
        
    ]).then(selection => {
            switch (selection.addViewUpdate){
                case "Add":
                    addRecord();
                    break;
                case "View":
                    viewRecord();
                    break;
                case "Update":
                    updateRecord();
                    
            }
        })
}

function addRecord (){
    inquirer.prompt ([
        {
            type: "list",
            message: "Would you like to Add a Department, Role or Employee?",
            name: "addType",
            choices: ["Department", "Role", "Employee"]
        }
    ])
}

function viewRecord (){
    inquirer.prompt ([
        {
            type: "list",
            message: "Would you like to View a Department, Role or Employee?",
            name: "viewType",
            choices: ["Department", "Role", "Employee"]
        }
    ])
}

function updateRecord (){
    inquirer.prompt ([
        {
            type: "list",
            message: "Would you like to Update a Department, Role or Employee?",
            name: "updateType",
            choices: ["Department", "Role", "Employee"]
        }
    ])
}


