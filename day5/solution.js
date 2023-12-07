const fs = require("fs");
const filePath = "input.txt";
// const filePath = "testInput.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  console.log("Part 1: " + part1(data));
  console.log("Part 2: " + part2(data));
});

const part1 = (input) => {
  let [seeds, ...charts] = input.split(/[\n|\r]+.*:[\r]*\n+/);
  let srcs = seeds.split(": ")[1].split(" ");
  charts
    .map((chart) =>
      chart.split(/[\r]*\n/).map((interval) => {
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
  let [seeds, ...charts] = input.split(/[\n|\r]+.*:[\r]*\n+/);
  let srcRanges = seeds
    .split(": ")[1]
    .split(" ")
    .map((start, i, arr) => ({
      min: +start,
      max: +start + +arr[i + 1] - 1,
    }))
    .filter((_, i) => i % 2 == 0);

  charts
    .map((chart) =>
      chart
        .split(/[\r]*\n/)
        .map((interval) => {
          const [dest, src, len] = interval.split(" ").map((val) => +val);
          return { min: src, max: src + len - 1, offset: dest - src };
        })
        .sort((a, b) => a.min - b.min)
    )
    .forEach((chart) => {
      const destRanges = srcRanges.flatMap((srcRange) =>
        getDestRanges(srcRange, chart)
      );
      srcRanges = [...destRanges];
    });
  return srcRanges
    .map((locRange) => locRange.min)
    .reduce((a, b) => Math.min(a, b));
};

const getDestRanges = (srcRange, mappings) => {
  let newRanges = [];
  let rangeListIdx = 0;
  let minPointer = srcRange.min;
  let max, offset;
  if (srcRange.min > mappings[mappings.length - 1].max) {
    return srcRange;
  }
  rangeListIdx = mappings.findIndex((mapping) => srcRange.min < mapping.max);
  while (minPointer <= srcRange.max) {
    const mapRange = mappings[rangeListIdx];
    if (!mapRange) {
      max = srcRange.max;
      offset = 0;
    } else if (isInRange(minPointer, mapRange)) {
      max = Math.min(srcRange.max, mapRange.max);
      offset = mapRange.offset;
      rangeListIdx++;
    } else {
      max = Math.min(srcRange.max, mapRange.min);
      offset = 0;
    }
    newRanges.push({
      min: minPointer + offset,
      max: max + offset,
    });
    minPointer = max + 1;
  }
  return newRanges;
};

const isInRange = (pointer, range) => {
  return pointer >= range.min && pointer <= range.max;
};
//   let newRanges = [];
//   let minPointer = srcRange.min;
//   while (minPointer <= srcRange.max) {
//     const matchingRange = mappings.find(
//       (range) => minPointer >= range.min && minPointer <= range.max
//     );
//     if (!matchingRange) {
//       const nextRange = mappings.find((range) => minPointer < range.min);
//       if (!nextRange) {
//         newRanges.push({ min: minPointer, max: srcRange.max });
//         minPointer = srcRange.max + 1;
//       } else {
//         const rangeMax = nextRange.min - 1;
//         newRanges.push({ min: minPointer, max: rangeMax });
//         minPointer = rangeMax + 1;
//       }
//     } else {
//       const offset = matchingRange.offset;
//       const rangeMax = Math.min(matchingRange.max, srcRange.max);
//       newRanges.push({ min: minPointer + offset, max: rangeMax + offset });
//       minPointer = rangeMax + 1;
//     }
//   }
//   return newRanges;
// };
