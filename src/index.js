require("dotenv").config();
const express = require("express");
const { DB } = require("./database/index");
const { models } = require("./database/models");
const xlsx = require("xlsx");
const { Student } = require("./database/models");

const { PORT } = process.env;
const app = express();
app.use(express.json());

models;

const file = xlsx.readFile("src/excel_files/test.xlsx");

let data = [];

const sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
  const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((content) => {
    data.push(content);
  });
}
console.log(data);

// Student.bulkCreate(data);

DB();

app.listen(PORT || 5000, () => {
  console.log("Server established 🚀🚀🚀");
});
