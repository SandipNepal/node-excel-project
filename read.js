const xlsx = require("xlsx");

const file = xlsx.readFile("excel_files/test.xlsx");

let data = [];

const sheets = file.SheetNames;

for (var i = 0; i < sheets.length; i++) {
  const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((content) => {
    data.push(content);
  });
}

console.log(data);


