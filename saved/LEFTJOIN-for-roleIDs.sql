SELECT role.id, role.title, employee.role_id, employee.first_name, employee.last_name 
FROM role
LEFT JOIN employee 
ON role.id = employee.role_id