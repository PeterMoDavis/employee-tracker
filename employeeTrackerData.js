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
function add() {
  console.log("view baby");
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
          console.log("add");
          break;
        case "Update employee roles":
          console.log("update");
        default:
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
