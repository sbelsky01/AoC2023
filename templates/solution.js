const fs = require("fs");
// const filePath = "input.txt";
const filePath = "testInput.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  const input = data.split(/[\r]*\n/);

  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));
});

const part1 = (input) => {
  return;
};

const part2 = (input) => {
  return;
};
