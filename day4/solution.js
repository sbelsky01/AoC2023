const fs = require("fs");
const filePath = "input.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  const input = data.split("\r");

  console.log("Part 1: \n" + part1(input));
  console.log("Part 2: \n" + part2(input));
});

const part1 = (input) => {
  return input;
};

const part2 = (input) => {
  return;
};