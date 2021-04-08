const inquirer = require("inquirer");
const mysql = require("mysql");

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
  }
}
//UPDATE
function update() {
  console.log("view baby");
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
          console.log("update");
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
