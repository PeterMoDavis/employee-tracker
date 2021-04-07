DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department(
id INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("warehouse"), ("front office"), ("marketing");


CREATE TABLE role (
id INTEGER AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER,
PRIMARY KEY (id)
);
-------------------------------------------------- 
INSERT INTO role (title, salary, department_id)
VALUES ("manager", 70, 123), ("janitor", 12, 133);

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT,
	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER NULL,
    PRIMARY KEY(id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Peter", "MoDavis", 3, 5), ("Gary", "Shandling", 6, 8);

SELECT * FROM employee_tracker.employee;