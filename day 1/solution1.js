const fs = require("fs");

const filePath = "input 1-1.txt";

let total = 0;

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const arr = data.split("\n");

  for (i = 0; i < arr.length; i++) {
    const line = arr[i];
    total += 10 * firstNumber(line);
    total += lastNumber(line);
  }
  console.log(total);
});

const firstNumber = (line) => {
  let i = 0;
  let char = line.charAt(i);
  while (isNaN(char)) {
    i++;
    char = line.charAt(i);
  }
  return Number(char);
};

const lastNumber = (line) => {
  let i = line.length - 1;
  let char = line.charAt(i);
  while (isNaN(char)) {
    i--;
    char = line.charAt(i);
  }
  return Number(char);
};
