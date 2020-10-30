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
            // case "Delete": //! Working on the Delete functionality
            //     deleteType();
            //     break
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
    ]).then(selection => {
        switch (selection.addType) {
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
        switch (selection.viewType) {
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

function updateType() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to Update a Department, Role or Employee?",
            name: "updateType",
            choices: ["Department", "Role", "Employee"]
        }
    ]).then((selection) => {
        switch (selection.updateType) {
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

function viewDepartment() {
    connection.query("SELECT * FROM department", (error, response) => {
        if (error) throw error;
        console.table(response)
    })
    addViewUpdate();
}

function viewRole() {
    connection.query("SELECT * FROM role", (error, response) => {
        if (error) throw error;
        console.table(response)
    })
    addViewUpdate();
}

function viewEmployee() {
    connection.query("SELECT * FROM employee", (error, response) => {
        if (error) throw error;
        console.table(response)
    })
    addViewUpdate();
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the Department?",
            name: "deptName",
        }
    ]).then((response) => {
        connection.query("INSERT INTO department (name) VALUE ('"+ response.deptName +"')")
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
    ]).then((response) => {
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
    ]).then((response) => {
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


function updateDepartment() {
    connection.query("SELECT * FROM department", (error, response) => {
        if (error) throw error;
        // console.log(response);
        const allDepts = []
        for (let i = 0; i < response.length; i++) {
            allDepts.push(response[i].name)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which department would you like to update?",
                name: "updateDeptName",
                choices: allDepts
            },
            {
                type: "input",
                message: "What would you like to rename this department to?",
                name: "newDeptName",
            }
        ]).then((response) => {
            const newDeptName = response.newDeptName
            const oldDeptName = response.updateDeptName
            connection.query(
                "UPDATE department SET name = '"
                + response.newDeptName +
                "' WHERE name = '"
                + response.updateDeptName +
                "'", (error, response) => {
                    if (error) throw error;
                    console.log("=========");
                    console.log("Updated " + oldDeptName + " to " + newDeptName);
                    console.log("=========");
                    addViewUpdate();
                }
            )

        })
    })
}

function updateRole() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to update the Role Title, Salary or Department ID?",
            name: "updateRoleValue",
            choices: ["Title", "Salary", "Department ID"]
        }
    ]).then((response) => {
        switch (response.updateRoleValue) {
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

function updateRoleTitle() {
    connection.query("SELECT title FROM role", (error, response) => {
        if (error) throw error
        const allRoleTitles = []
        for (let i = 0; i < response.length; i++) {
            allRoleTitles.push(response[i].title)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which Role would you like to update?",
                name: "updateRoleTitle",
                choices: allRoleTitles
            },
            {
                type: "input",
                message: "What would you like to rename this Role to?",
                name: "newRoleTitle",
            }
        ]).then((response) => {
            const newTitle = response.newRoleTitle
            const oldTitle = response.updateRoleTitle
            connection.query(
                "UPDATE employeedb.role SET title = '"
                + response.newRoleTitle +
                "' WHERE title = '"
                + response.updateRoleTitle +
                "'", (error, response) => {
                    if (error) throw error;
                    console.log("=========");
                    console.log("Updated " + oldTitle + " to " + newTitle);
                    console.log("=========");
                    addViewUpdate();
                }
            )
        })
    })
}

function updateRoleSalary() {
    connection.query("SELECT * FROM role", (error, response) => {
        if (error) throw error
        const allSalaries = []
        for (let i = 0; i < response.length; i++) {
            allSalaries.push(response[i].title)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which Role would you like to update?",
                name: "updateRoleSalary",
                choices: allSalaries
            },
            {
                type: "input",
                message: "How much is the new Salary for this role?",
                name: "newRoleSalary",
            }
        ]).then((response) => {
            const newSalary = response.newRoleSalary
            const oldSalary = response.updateRoleSalary
            connection.query(
                "UPDATE employeedb.role SET salary = "
                + response.newRoleSalary +
                " WHERE title = '"
                + response.updateRoleSalary
                + "'", (error, response) => {
                    if (error) throw error;
                    console.log("=========");
                    console.log("Updated the salary for " + oldSalary + " to " + newSalary);
                    console.log("=========");
                    addViewUpdate();
                }
            )

        })
    })
}

function updateRoleDeptID() {
    connection.query("SELECT * FROM role", (error, response) => {
        if (error) throw error
        const allDeptIDs = []
        for (let i = 0; i < response.length; i++) {
            allDeptIDs.push(response[i].title)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which Role would you like to update the Department ID?",
                name: "updateRoleDeptID",
                choices: allDeptIDs
            },
            {
                type: "input",
                message: "What is the new Department ID for this role?",
                name: "newRoleDeptID",
            }
        ]).then((response) => {
            const oldRoleDept = response.updateRoleDeptID
            const newID = response.newRoleDeptID
            connection.query(
                "UPDATE employeedb.role SET department_id = "
                + response.newRoleDeptID +
                " WHERE title = '"
                + response.updateRoleDeptID +
                "'", (error, response) => {
                    if (error) throw error;
                    console.log("=========");
                    console.log("Updated the Department ID for " + oldRoleDept + " to " + newID);
                    console.log("=========");
                    addViewUpdate();
                }
            )

        })
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to update the Employee First Name, Last Name, Role ID or Manager ID?",
            name: "updateEmpValue",
            choices: ["First Name", "Last Name", "Role ID", "Manager ID"]
        }
    ]).then((response) => {
        switch (response.updateEmpValue) {
            case "First Name":
                updateFN()
                break
            case "Last Name":
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

function updateFN() {
    connection.query("SELECT * FROM employee", (error, response) => {
        if (error) throw error
        const allIds = []
        for (let i = 0; i < response.length; i++) {
            allIds.push(response[i].id)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee ID would you like to update?",
                name: "updateEmID",
                choices: allIds
            },
            {
                type: "input",
                message: "What is the updated first name for the employee?",
                name: "newRoleEmFN",
            }
        ]).then((response) => {
            const oldID = response.updateEmID
            const newFirstName = response.newRoleEmFN
            connection.query(
                "UPDATE employeedb.employee SET first_name = '"
                + response.newRoleEmFN +
                "' WHERE id = "
                + response.updateEmID, (error, response) => {
                    if (error) throw error;
                    console.log("\n");
                    connection.query("select * from employee", (error, response) => {
                        if (error) throw error
                        console.table(response)
                        console.log("=========");
                        console.log("Updated the First Name of Employee ID " + oldID + " to " + newFirstName);
                        console.log("=========");
                        addViewUpdate();
                    })
                }
            )
        })
    })
}

function updateLN() {
    connection.query("SELECT * FROM employee", (error, response) => {
        if (error) throw error
        const allIds = []
        for (let i = 0; i < response.length; i++) {
            allIds.push(response[i].id)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee ID would you like to update?",
                name: "updateEmID",
                choices: allIds
            },
            {
                type: "input",
                message: "What is the updated last name for the employee?",
                name: "newRoleEmLN",
            }
        ]).then((response) => {
            const empID = response.updateEmID
            const newLastName = response.newRoleEmLN
            connection.query(
                "UPDATE employeedb.employee SET last_name = '"
                + response.newRoleEmLN +
                "' WHERE id = "
                + response.updateEmID, (error, response) => {
                    if (error) throw error;
                    console.log("\n");
                    connection.query("select * from employee", (error, response) => {
                        if (error) throw error
                        console.table(response)
                        console.log("=========");
                        console.log("Updated the Last Name of Employee ID " + empID + " to " + newLastName);
                        console.log("=========");
                        addViewUpdate();
                    })
                }
            )
        })
    })
}

function updateRoleID() {
    connection.query("SELECT * FROM employee", (error, response) => {
        if (error) throw error
        const allIds = []
        for (let i = 0; i < response.length; i++) {
            allIds.push(response[i].id)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee ID would you like to update?",
                name: "updateEmID",
                choices: allIds
            },
            {
                type: "input",
                message: "What is the updated Role ID for the employee?",
                name: "newRoleEmRoleID",
            }
        ]).then((response) => {
            const empID = response.updateEmID
            const newRoleID = response.newRoleEmRoleID
            connection.query(
                "UPDATE employeedb.employee SET role_id = "
                + response.newRoleEmRoleID +
                " WHERE id = "
                + response.updateEmID, (error, response) => {
                    if (error) throw error;
                    console.log("\n");
                    connection.query("select * from employee", (error, response) => {
                        if (error) throw error
                        console.table(response)
                        console.log("=========");
                        console.log("Updated the Role ID of Employee ID " + empID + " to " + newRoleID);
                        console.log("=========");
                        addViewUpdate();
                    })
                }
            )
        })
    })
}

function updateManagerID() {
    connection.query("SELECT * FROM employee", (error, response) => {
        if (error) throw error
        const allIds = []
        for (let i = 0; i < response.length; i++) {
            allIds.push(response[i].id)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee ID would you like to update?",
                name: "updateEmID",
                choices: allIds
            },
            {
                type: "input",
                message: "What is the updated Manager ID for the employee?",
                name: "newRoleEmMgID",
            }
        ]).then((response) => {
            const empID = response.updateEmID
            const newManagerID = response.newRoleEmMgID
            connection.query(
                "UPDATE employeedb.employee SET manager_id = "
                + response.newRoleEmMgID +
                " WHERE id = "
                + response.updateEmID, (error, response) => {
                    if (error) throw error;
                    console.log("\n");
                    connection.query("select * from employee", (error, response) => {
                        if (error) throw error
                        console.table(response)
                        console.log("=========");
                        console.log("Updated the Manager ID of Employee ID " + empID + " to " + newManagerID);
                        console.log("=========");
                        addViewUpdate();
                    })
                }
            )
        })
    })
}

function deleteType() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to Delete an Employee, Role or Department?",
            name: "deleteType",
            choices: ["Employee", "Role", "Department"]
        },
    ]).then((response) => {
        switch (response.deleteType) {
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

function deleteEmployee() {
    connection.query("SELECT * FROM employee", (error, response) => {

        if (error) throw error
        const allEmpIDs = []
        for (let i = 0; i < response.length; i++) {
            allEmpIDs.push(response[i].id)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee ID would you like to delete?",
                name: "deleteEmID",
                choices: allEmpIDs
            }
        ]).then((response) => {
            connection.query("DELETE FROM employeeDB.employee WHERE id = " + response.deleteEmID, (error, response) => {
                if (error) throw error
                connection.query("select * from employee", (error, response) => {
                    console.log("\n");
                    console.table(response)
                    console.log("Record Deleted");
                    console.log("\n");
                    addViewUpdate();

                })
            })
        })
    })
}

function deleteRole() {
    connection.query("SELECT * FROM role", (error, response) => {
        if (error) throw error
        const allRoleTitles = []
        for (let i = 0; i < response.length; i++) {
            allRoleTitles.push(response[i].title)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which Role ID would you like to delete?",
                name: "roleTitle",
                choices: allRoleTitles
            }
        ]).then((response) => {
            connection.query(
                "DELETE FROM employeeDB.role WHERE title = '" + response.roleTitle + "'", (error, response) => {
                    if (error) throw error
                    connection.query("SELECT * FROM role", (error, response) => {
                        console.table(response)
                        console.log("Record Deleted");
                        addViewUpdate();
                    })
                })
        })
    })
}

function deleteDepartment() {
    connection.query("SELECT * FROM department", (error, response) => {

        if (error) throw error
        const allDeptNames = []
        for (let i = 0; i < response.length; i++) {
            allDeptNames.push(response[i].name)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which Department ID would you like to delete?",
                name: "deptID",
                choices: allDeptNames
            }
        ]).then((response) => {
            connection.query(
                "DELETE FROM employeeDB.department WHERE name = '" + response.deptID + "'", (error, response) => {
                    if (error) throw error
                    connection.query("select * from department", (error, response) => {
                        console.log("\n");
                        console.table(response)
                        console.log("Record Deleted");
                        console.log("\n");
                        addViewUpdate();

                    })
                })
        })
    })
}
