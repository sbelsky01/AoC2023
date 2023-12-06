const fs = require("fs");
const filePath = "input.txt";
// const filePath = "testInput.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  const input = data.split("\n");

  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));
});

const canWin = (hold, time, distance) => {
  return hold * (time - hold) > distance;
};

const part1 = (input) => {
  const [times, distances] = input.map((line) =>
    line.split(/:\s*/)[1].split(/\s+/)
  );
  return times
    .map((t, idx) => {
      const time = +t;
      const distanceRecord = +distances[idx];
      let min = 0;
      let max = time;
      while (min <= max) {
        const mid = Math.ceil((max + min) / 2);
        if (canWin(mid, time, distanceRecord)) {
          max = mid - 1;
        } else {
          min = mid + 1;
        }
      }
      return time - 2 * min + 1;
    })
    .reduce((a, b) => a * b);
};

const part2 = (input) => {
  const [time, distanceRecord] = input.map((line) =>
    Number(
      line
        .split(/:\s*/)[1]
        .split(/\s+/)
        .reduce((a, b) => a + b)
    )
  );
  let min = 0;
  let max = time;
  while (min <= max) {
    const mid = Math.ceil((max + min) / 2);
    if (canWin(mid, time, distanceRecord)) {
      max = mid - 1;
    } else {
      min = mid + 1;
    }
  }
  return time - 2 * min + 1;
};
