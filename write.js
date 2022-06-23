const xlsx = require("xlsx")
  
const file = xlsx.readFile("excel_files/test.xlsx")
  
let student_data = [{
    Student:'Rohit',
    Marks: 315
},
{
    Student:'Sagar',
    Marks:352
}]
  
const write = xlsx.utils.json_to_sheet(student_data);
  
xlsx.utils.book_append_sheet(file,write,"Sheet5");
  
xlsx.writeFile(file,"excel_files/test.xlsx");