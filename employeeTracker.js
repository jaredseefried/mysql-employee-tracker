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
            choices: ["Add", "View", "Update", "Done"]
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
                break;
            case "Done":
                connection.end()
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
                break;
            case "Role":
                viewRole();
                break;
            case "Employee":
                viewEmployee()
                
        }
    })
}

function updateOrDelete(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to Update or Delete a Department, Role or Employee?",
            name: "updateOrDelete",
            choices: ["Update", "Delete"]
        }
    ]).then((response)=>{
        switch (response.updateOrDelete){
            case "Update":
                updateType();
                break
            case "Delete":
                deleteType();
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
    ]).then ((selection) =>{
        switch (selection.updateType){
            case "Department":
                updateDepartment();
                break
            case "Role":
                updateRole();
                break
            case "Employee":
                updateEmployee();

        }
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the Department?",
            name: "deptName",
        }
    ]).then ((response) => {
        const newDept = new Department (response.deptName);
        console.log(newDept);
        connection.query(
            "INSERT INTO department (name) VALUE ('"
            + response.deptName + 
            "')"
        )
        console.table(response);
        addViewUpdate();
    })
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
    ]).then((response) =>{
        connection.query(
            "INSERT INTO role(title, salary, department_id) VALUES ('" 
            + response.roleTitle + 
            "',"
            + response.roleSalary +
            ","
            + response.roleDeptID +
            ")"
        )
        console.table(response);
        addViewUpdate();
    })
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
    ]).then((response) =>{
        connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES ('" 
            + response.employeeFirst + 
            "','"
            + response.employeeLast +
            "',"
            + response.employeeRoleID +
            ","
            + response.employeeManagerID +
            ")"
        )
        console.table(response);
        addViewUpdate();
    })
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



function updateDepartment(){
    //! I want to bring in all options as choices const depts
    inquirer.prompt([
        {
            type: "input",
            message: "Which department would you like to update?",
            name: "updateDeptName",
            // choices: []
        },
        {
            type: "input",
            message: "What would you like to rename this department to?",
            name: "newDeptName",
        }
    ]).then ((response) => {
        connection.query(
            "UPDATE department SET name = '"
            + response.newDeptName +
            "' WHERE name = '"
            +response.updateDeptName+
            "'", (error, response) => {
                if (error) throw error;
                console.table(response)
            }
        )
    })
}

function updateRole(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to update the Role Title, Salary or Department ID?",
            name: "updateRoleValue",
            choices: ["Title", "Salary, Department ID"]
        }
    ]).then((response)=>{
        switch (response.updateRoleValue){
            case "Title":
                updateRoleTitle()
                break
            case "Salary":
                updateRoleSalary();
                break
            case "Department ID":
                updateRoleDeptID()
        }
    })
}

function updateRoleTitle (){
    inquirer.prompt([
        {
            type: "input",
            message: "Which Role would you like to update?",
            name: "updateRoleTitle",
        },
        {
            type: "input",
            message: "What would you like to rename this Role to?",
            name: "newRoleTitle",
        }
    ]).then((response)=>{
        connection.query(
            "UPDATE employeedb.role SET title = '"
            + response.newRoleTitle +
            "' WHERE title = '"
            +response.updateRoleTitle+
            "'", (error, response) => {
                if (error) throw error;
                console.table(response)
            }
        )
    })
}

function updateRoleSalary(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which Role Salary would you like to update?",
            name: "updateRoleSalary",
        },
        {
            type: "input",
            message: "How much is the new Salary for this role?",
            name: "newRoleSalary",
        }
    ]).then((response)=>{
        connection.query(
            "UPDATE employeedb.role SET salary = '"
            + response.newRoleSalary +
            "' WHERE title = '"
            +response.updateRoleSalary+
            "'", (error, response) => {
                if (error) throw error;
                console.table(response)
            }
        )
    })
}

function updateRoleDeptID(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which Role Department ID would you like to update?",
            name: "updateRoleDeptID",
        },
        {
            type: "input",
            message: "What is the new Deptarment ID for this role?",
            name: "newRoleDeptID",
        }
    ]).then((response)=>{
        connection.query(
            "UPDATE employeedb.role SET department_id = '"
            + response.newRoleSalary +
            "' WHERE title = '"
            +response.updateRoleDeptID+
            "'", (error, response) => {
                if (error) throw error;
                console.table(response)
            }
        )
    })
}

function updateEmployee(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to update the Employee First Name, Last Name, Role ID or Manager ID?",
            name: "updateEmpValue",
            choices: ["First Name", "Last Name, Role ID", "Manager ID"]
        }
    ]).then((response)=>{
        switch (response.updateEmpValue){
            case "First Name":
                updateFN()
                break
            case "Salary":
                updateLN();
                break
            case "Role ID":
                updateRoleID()
                break
            case "Manager ID":
                updateManagerID()
        }
    })
}

function updateFN(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee ID would you like to update?",
            name: "updateEmID",
        },
        {
            type: "input",
            message: "What is the updated first name for the employee?",
            name: "newRoleEmFN",
        }
    ]).then((response)=>{
        connection.query(
            "UPDATE employeedb.employee SET first_name = '"
            + response.newRoleEmFN +
            "' WHERE id = '"
            +response.updateEmID+
            "'", (error, response) => {
                if (error) throw error;
                console.table(response)
            }
        )
    })
}
function updateLN(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee ID would you like to update?",
            name: "updateEmID",
        },
        {
            type: "input",
            message: "What is the updated last name for the employee?",
            name: "newRoleEmLN",
        }
    ]).then((response)=>{
        connection.query(
            "UPDATE employeedb.employee SET last_name = '"
            + response.newRoleEmLN +
            "' WHERE id = '"
            +response.updateEmID+
            "'", (error, response) => {
                if (error) throw error;
                console.table(response)
            }
        )
    })
}

function updateRoleID(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee ID would you like to update?",
            name: "updateEmID",
        },
        {
            type: "input",
            message: "What is the updated Role ID for the employee?",
            name: "newRoleEmRoleID",
        }
    ]).then((response)=>{
        connection.query(
            "UPDATE employeedb.employee SET last_name = '"
            + response.newRoleEmRoleID +
            "' WHERE id = '"
            +response.updateEmID+
            "'", (error, response) => {
                if (error) throw error;
                console.table(response)
            }
        )
    })
}

function updateManagerID(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee ID would you like to update?",
            name: "updateEmID",
        },
        {
            type: "input",
            message: "What is the updated Manager ID for the employee?",
            name: "newRoleEmMgID",
        }
    ]).then((response)=>{
        connection.query(
            "UPDATE employeedb.employee SET last_name = '"
            + response.newRoleEmMgID +
            "' WHERE id = '"
            +response.updateEmID+
            "'", (error, response) => {
                if (error) throw error;
                console.table(response)
            }
        )
    })
}

function deleteType(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to Delete an Employee, Role or Department?",
            name: "deleteType",
            choices: ["Employee", "Role", "Department"]
        },
    ]).then ((response) => {
        switch (response.deleteType){
            case "Employee":
                deleteEmployee();
                break
            case "Role":
                deleteRole();
                break
            case "Department":
                deleteDepartment();
        }
    })
}

function deleteEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee ID would you like to delete?",
            name: "deleteEmID",
        }
    ]).then((response)=>{
        connection.query(
            "DELETE FROM employeeDB.employee WHERE "
            + response.deleteEmID 
        )
    })
}

function deleteRole (){
    inquirer.prompt([
        {
            type: "input",
            message: "Which Role ID would you like to delete?",
            name: "roleID",
        }
    ]).then((response)=>{
        connection.query(
            "DELETE FROM employeeDB.role WHERE "
            + response.roleID 
        )
    })
}

function deleteDepartment (){
    inquirer.prompt([
        {
            type: "input",
            message: "Which Department ID would you like to delete?",
            name: "deptID",
        }
    ]).then((response)=>{
        connection.query(
            "DELETE FROM employeeDB.role WHERE "
            + response.deptID 
        )
    })
}

