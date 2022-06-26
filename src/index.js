require("dotenv").config();
const express = require("express");
const { DB } = require("./database/index");
const { models } = require("./database/models");
const xlsx = require("xlsx");
const _ = require("lodash");
const { Student } = require("./database/models");
const { PORT } = process.env;
const app = express();
app.use(express.json());

models;

const file = xlsx.readFile("src/excel_files/test.xlsx");

const workSheet = file.Sheets["Sheet1"];

const excel_data = xlsx.utils.sheet_to_json(workSheet);

const sheets = file.SheetNames;
for (let i = 0; i < sheets.length; i++) {
  excel_data.forEach(async (content) => {
    // console.log(content);
    const result = await Student.findOne({ where: { id: content.id } });
    if (!result) {
      // insert this into database table
      const res = await Student.create(content);
    } else {
      async function checkChanges() {
        await Student.findAll({
          raw: true,
          attributes: ["id", "name", "address", "contact", "marks", "total"],
        }).then(async (db_data) => {
          //console.log(_.isEqual(db_data, excel_data));
          if (!_.isEqual(db_data, excel_data)) {
            //console.log(excel_data);
            //console.log(db_data);
            console.log("Changes made to excel file");
            // A comparer used to determine if two entries are equal.
            const isSameData = (db_data, excel_data) =>
              db_data.id === excel_data.id &&
              db_data.name === excel_data.name &&
              db_data.address === excel_data.address &&
              db_data.contact === excel_data.contact &&
              db_data.marks === excel_data.marks &&
              db_data.total === excel_data.total;
            // Get items that only occur in the left array,
            // using the compareFunction to determine equality.
            const onlyInLeft = (left, right, compareFunction) =>
              left.filter(
                (leftValue) =>
                  !right.some((rightValue) =>
                    compareFunction(leftValue, rightValue)
                  )
              );
            const onlyInDb = onlyInLeft(db_data, excel_data, isSameData);
            const onlyInExcel = onlyInLeft(excel_data, db_data, isSameData);
            const changes = [...onlyInExcel];
            var nameArray = changes.map(function (el) {
              Student.update(
                {
                  name: el.name,
                  address: el.address,
                  contact: el.contact,
                  marks: el.marks,
                  total: el.total,
                },
                {
                  where: { id: el.id },
                }
              );
            });
            //  console.log(changes);
          } else {
            console.log("No changes in excel file");
          }
        });
      }
      const res = await checkChanges();
      //1. compare result values to content values
      //2. if any of the value alters -> update database table
      //3. if no change, do nothing
    }
  });
}
DB();
app.listen(PORT || 5000, () => {
  console.log("Server established 🚀🚀🚀");
});
