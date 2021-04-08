const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "BrianRapshby!1!",
  database: "employee_tracker",
});

//functions==========================================================================
//VIEW
function view(option) {
  connection.query(`SELECT * FROM ${option}`, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
//ADD
function add(option) {
  if (option === "department") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the department name?",
          name: "area",
        },
      ])
      .then(({ area }) => {
        console.log(area);
        connection.query(
          `INSERT INTO department (name) VALUES("${area}")`,
          (err, res) => {
            if (err) throw err;
            start();
          }
        );
      });
  } else if (option === "role") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the title?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary?",
          name: "salary",
        },
        {
          type: "input",
          message: "What is the department id?",
          name: "departmentId",
        },
      ])
      .then(({ title, salary, departmentId }) => {
        connection.query(
          `INSERT INTO role SET ?`,
          {
            title: title,
            salary: salary,
            department_id: departmentId,
          },
          (err, res) => {
            if (err) throw err;
            start();
          }
        );
      });
  } else
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the first name of the employee?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the last name of the employee?",
          name: "lastName",
        },
        {
          type: "input",
          message: "What is the role id of the employee?",
          name: "roleId",
        },
        {
          type: "input",
          message: "What is the manager id of the employee?",
          name: "managerId",
        },
      ])
      .then(({ firstName, lastName, roleId, managerId }) => {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: firstName,
            last_name: lastName,
            role_id: roleId,
            manager_id: managerId,
          },
          (err, res) => {
            if (err) throw err;
            start();
          }
        );
      });
}
//UPDATE
function updateEmployeeRoles() {
  connection.query(
    `SELECT first_name, last_name, id FROM employee`,
    (err, res) => {
      if (err) throw err;
      let arr = [];
      res.forEach(({ first_name, last_name, id }) => {
        arr.push(`${id} ${first_name} ${last_name}`);
      });
      console.log(arr);
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee role do you wish to change sire?",
            name: "employee",
            choices: arr,
          },
          {
            type: "input",
            message: "What would you like to change the roll id to?",
            name: "roleId",
          },
        ])
        .then(({ employee, roleId }) => {
          connection.query(
            `UPDATE employee SET role_id = ${roleId} WHERE id=${parseInt(
              employee.split(" ")[0]
            )}`,
            (err, res) => {
              if (err) throw err;
              start();
            }
          );
        });
    }
  );
}
function updateEmployeeManager() {
  connection.query(
    `SELECT first_name, last_name, id FROM employee`,
    (err, res) => {
      if (err) throw err;
      let arr = [];
      res.forEach(({ first_name, last_name, id }) => {
        arr.push(`${id} ${first_name} ${last_name}`);
      });
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee manager id do you wish to change sire?",
            name: "employee",
            choices: arr,
          },
          {
            type: "input",
            message: "What would you like to change the manager id to?",
            name: "managerId",
          },
        ])
        .then(({ employee, managerId }) => {
          connection.query("UPDATE employee SET ? WHERE ?", [
            {
              manager_id: managerId,
            },
            {
              id: parseInt(employee.split(" ")[0]),
            },
            (err, res) => {
              if (err) throw err;
              start();
            },
          ]);
        });
    }
  );
}

//==================================================================================

let start = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: [
          "View departments, roles or employees",
          "Add departments, roles or Employees",
          "Update employee roles",
          "Update employee manager",
          "End",
        ],
      },
    ])
    .then((response) => {
      let data = response.options;
      switch (data) {
        case "View departments, roles or employees":
          inquirer
            .prompt([
              {
                type: "list",
                message: "Would you like to view:",
                name: "options",
                choices: ["Departments", "Roles", "Employees"],
              },
            ])
            .then(({ options }) => {
              let chosen = options.toLowerCase().slice(0, -1);
              view(chosen);
            });
          break;
        case "Add departments, roles or Employees":
          inquirer
            .prompt([
              {
                type: "list",
                message: "What would you like to add to?",
                name: "options",
                choices: ["Departments", "Roles", "Employees"],
              },
            ])
            .then(({ options }) => {
              let chosen = options.toLowerCase().slice(0, -1);
              add(chosen);
            });
          break;
        case "Update employee roles":
          updateEmployeeRoles();
          break;
        case "Update employee manager":
          updateEmployeeManager();
          break;
        default:
          connection.end();
          break;
      }
    });
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  afterConnection();
});

const afterConnection = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    start();
  });
};
