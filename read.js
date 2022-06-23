/*read from a file do some calculations and save it in a new excel file  */
const xlsx = require("xlsx");
const file = xlsx.readFile("excel_files/test.xlsx");

const workSheet = file.Sheets["Sheet1"];
const data = xlsx.utils.sheet_to_json(workSheet);
// console.log(data);

const newData = data.map(function (record) {
  record.percentage = record.marks * (100 / record.total);
  delete record.address;
  delete record.contact;
  return record;
});

const newWorkBook = xlsx.utils.book_new();
const newWorkSheet = xlsx.utils.json_to_sheet(newData);
xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, "Percentage");
xlsx.writeFile(newWorkBook, "excel_files/studentPercentage.xlsx");

console.log(newData);
