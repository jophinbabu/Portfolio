const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('d:\\portfolio\\new\\Jophin_Babu_FullStack_Developer (2).pdf');

pdf(dataBuffer).then(function(data) {
  fs.writeFileSync('d:\\portfolio\\new\\resume_text.txt', data.text);
  console.log("PDF text extracted to resume_text.txt");
}).catch(err => {
  console.error(err);
});
