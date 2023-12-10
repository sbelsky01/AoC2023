const fs = require("fs");

const filePath = "input.txt";
// const filePath = "testInput.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  const input = data.split(/[\r]*\n/);

  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));
});

const part1 = (input) => {
  return input
    .map((line) => {
      line = line.split(" ");
      let all0 = false;
      let lastNums = [+line[line.length - 1]];
      while (!all0) {
        all0 = true;
        line.map((num, idx, arr) => {
          const diff = arr[idx + 1] - num;
          if (!!diff) all0 = false;
          if (idx < arr.length - 1) arr[idx] = diff;
          else arr[idx] = arr[idx - 1];
        });
        lastNums.push(line.pop());
      }
      return lastNums.reduce(sum);
    })
    .reduce(sum);
};

const part2 = (input) => {
  return input
    .map((line) => {
      line = line.split(" ");
      let all0 = false;
      let lastNums = [+line[0]];
      while (!all0) {
        all0 = true;
        line.map((num, idx, arr) => {
          const diff = arr[idx + 1] - num;
          if (!!diff) all0 = false;
          if (idx < arr.length - 1) arr[idx] = diff;
          else arr[idx] = arr[0];
        });
        lastNums.push(line.pop());
      }
      return lastNums.reverse().reduce((a, b) => b - a);
    })
    .reduce(sum);
};

const sum = (a, b) => a + b;
