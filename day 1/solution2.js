const fs = require("fs");

const filePath = "input 1-1.txt";

let total = 0;

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  const input = data.split("\n");

  for (i = 0; i < input.length - 1; i++) {
    const line = input[i];

    total += 10 * firstNumber(line);
    total += lastNumber(line);
  }
  console.log(total);
});

const numMap = new Map([
  ["zero", 0],
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);
const mapKeys = numMap.keys();

const firstNumber = (line) => {
  let i = 0;
  let num = numStartsAt(i, line);
  while (!num) {
    i++;
    num = numStartsAt(i, line);
  }
  return num;
};

const lastNumber = (line) => {
  let i = line.length - 1;
  let num = numStartsAt(i, line);
  while (!num) {
    i--;
    num = numStartsAt(i, line);
  }
  return num;
};

const numStartsAt = (idx, line) => {
  let string = line.charAt(idx);
  if (!isNaN(string)) {
    return Number(string);
  }

  string = "";

  for (let i = idx; i < line.length; i++) {
    string += line.charAt(i);
    if (!matchInMap(string)) {
      return null;
    }
    if (numMap.has(string)) {
      return numMap.get(string);
    }
  }
  return null;
};

const matchInMap = (string) => {
  const regex = new RegExp(`${string}.*`);
  const keys = numMap.keys();
  for (const key of keys) {
    if (regex.test(key)) {
      return true;
    }
  }
  return false;
};
