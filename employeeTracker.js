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
    // afterConnection();
});

function afterConnection() {
    connection.query("{UPDATE}", function (error, result) {
        if (error) throw error;
        console.table(result);

        // postBid();
        // connection.end();
    });
}

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