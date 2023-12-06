const fs = require("fs");
const filePath = "input.txt";
// const filePath = "testInput.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  console.log("Part 1: \n" + part1(data));
  console.log("Part 2: " + part2(data));
});

const part1 = (input) => {
  let [seeds, ...charts] = input.split(/[\n|\r]+.*:\n+/);
  let srcs = seeds.split(": ")[1].split(" ");
  charts
    .map((chart) =>
      chart.split(/\n/).map((interval) => {
        const [dest, src, len] = interval.split(" ").map((val) => +val);
        return { min: src, max: src + len - 1, offset: dest - src };
      })
    )
    .forEach((chart) => {
      const destinations = srcs.map(
        (val) =>
          +val +
          (chart.find((interval) => interval.min <= val && val <= interval.max)
            ?.offset ?? 0)
      );
      srcs = [...destinations];
    });
  return srcs.reduce((a, b) => Math.min(a, b));
};

const part2 = (input) => {
  return;
};
