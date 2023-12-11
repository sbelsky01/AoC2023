const fs = require('fs');
const filePath = 'input.txt';
// const filePath = 'testInput.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  const input = data.split(/[\r]*\n/);

  console.log('Part 1: ' + part1(input));
  console.log('Part 2: ' + part2(input));
});

const part1 = input => {
  const sIdx = input.reduce((a, b) => a + b).indexOf('S');
  const [xStart, yStart] = [
    sIdx % input[0].length,
    Math.floor(sIdx / input[0].length)
  ];

  let [xD, yD, dir] = getFirstMove(xStart, yStart, input);
  let x = xStart + xD,
    y = yStart + yD,
    loop = 1;

  while (!(x == xStart && y == yStart)) {
    const char = input[y][x];
    [xD, yD, dir] = getDeltas(char, dir);
    x += xD;
    y += yD;
    loop++;
  }
  return Math.ceil(loop / 2);
};

const part2 = input => {
  return;
};

const getFirstMove = (x, y, input) => {
  const up = input[x][y - 1];
  if (up == '|' || up == '7' || up == 'F') return cf('S');
  const right = input[x + 1][y];
  if (right == '-' || right == 'J' || right == '7') return cf('W');
  const down = input[x][y + 1];
  if (down == '|' || down == 'L' || down == 'J') return cf('N');
  const left = input[x - 1][y];
  if (left == '-' || left == 'L' || left == 'F') return cf('E');
};

const getDeltas = (char, dir) => {
  switch (char) {
    case '|':
      return deltas('NS', dir);
    case '-':
      return deltas('EW', dir);
    case 'L':
      return deltas('SW', dir);
    case 'J':
      return deltas('SE', dir);
    case '7':
      return deltas('NE', dir);
    case 'F':
      return deltas('NW', dir);
  }
};

const deltas = (str, dir) => cf(str.replace(dir, ''));

const cf = dir => {
  switch (dir) {
    case 'N':
      return [0, 1, 'S'];
    case 'S':
      return [0, -1, 'N'];
    case 'E':
      return [-1, 0, 'W'];
    case 'W':
      return [1, 0, 'E'];
  }
};
