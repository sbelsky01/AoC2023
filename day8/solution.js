const fs = require("fs");
const filePath = "input.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  const input = data.split(/[\r]*\n[\r]*\n/);
  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));
});

const part1 = (input) => {
  const [instr, nodes] = input;
  const map = new Map();
  nodes.split(/[\r]*\n/).forEach((node) => {
    map.set(node.substring(0, 3), {
      L: node.substring(7, 10),
      R: node.substring(12, 15),
    });
  });
  let currNode = "AAA";
  let steps = 0,
    instrPos = 0;
  while (currNode !== "ZZZ") {
    currNode = map.get(currNode)[instr[instrPos]];
    instrPos = (instrPos + 1) % instr.length;
    steps += 1;
  }
  return steps;
};

const part2 = (input) => {
  const [instr, nodes] = input;
  const map = new Map();
  let startNodes = [];
  nodes.split(/[\r]*\n/).forEach((node) => {
    const nodeName = node.substring(0, 3);
    map.set(nodeName, {
      L: node.substring(7, 10),
      R: node.substring(12, 15),
    });
    if (nodeName[2] === "A") {
      startNodes.push(nodeName);
    }
  });
  return startNodes
    .map((node) => {
      let steps = 0,
        instrPos = 0;
      while (node[2] !== "Z") {
        node = map.get(node)[instr[instrPos]];
        instrPos = (instrPos + 1) % instr.length;
        steps += 1;
      }
      return steps;
    })
    .reduce((a, b) => lcm(a, b));
};

const lcm = (a, b) => (a * b) / gcd(a, b);
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
