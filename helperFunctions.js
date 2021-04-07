let mysql = require("mysql");

module.exports = {
  view(option) {
    connection.query(`SELECT ${option}  FROM employee_tracker`, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  },
  add() {
    console.log("view baby");
  },
  update() {
    console.log("view baby");
  },
};
