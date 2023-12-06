const fs = require("fs");
const filePath = "input.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  const input = data.split("\n");

  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));
});

const part1 = (input) => {
  return input
    .map((line) => {
      const [, winNums, cardNums] = line
        .split(/\s*[:||]\s*/)
        .map((part) => part.split(/\s+/));
      const matchCount = cardNums.filter((str) => winNums.includes(str)).length;
      return matchCount ? Math.pow(2, matchCount - 1) : 0;
    })
    .reduce((prev, curr) => prev + curr);
};

const part2 = (input) => {
  return input
    .map((line) => {
      const [, winNums, cardNums] = line
        .split(/\s*[:||]\s*/)
        .map((part) => part.split(/\s+/));
      return {
        qty: 1,
        numMatches: cardNums.filter((num) => winNums.includes(num)).length,
      };
    })
    .map((card, cardIdx, allCards) => {
      for (let idx = 0; idx < card.numMatches; idx++) {
        allCards[cardIdx + idx + 1].qty += card.qty;
      }
      return card.qty;
    })
    .reduce((prev, curr) => prev + curr);
};
