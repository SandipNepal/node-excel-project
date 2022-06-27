require("dotenv").config();
const express = require("express");
const { DB } = require("./database/index");
const { models } = require("./database/models");
const xlsx = require("xlsx");
const { Student } = require("./database/models");
const { PORT } = process.env;
const app = express();
app.use(express.json());

//IIF
(async function () {
  await DB();
  models;

  const file = xlsx.readFile("src/excel_files/test.xlsx");

  const workSheet = file.Sheets["Sheet1"];

  const excel_data = xlsx.utils.sheet_to_json(workSheet);

  const sheets = file.SheetNames;
  for (let i = 0; i < sheets.length; i++) {
    excel_data.forEach(async (content) => {
      const instance = await Student.findOne({ where: { id: content.id } });
      if (!instance) {
        await Student.create(content);
      } else {
        if (
          content.name !== instance.name ||
          content.address !== instance.address ||
          content.address !== instance.address ||
          content.contact !== instance.contact ||
          content.marks !== instance.marks ||
          content.total !== instance.total
        ) {
          await instance.update(content);
        }
      }
    });
  }

  app.listen(PORT || 5000, () => {
    console.log("Server established 🚀🚀🚀");
  });
})();
