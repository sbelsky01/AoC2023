const fs = require('fs');
const filePath = 'input.txt';
// const filePath = 'testInput.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  const input = data.split(/[\r]*\n/);

  console.log('Part 1: ' + part1(input));
  console.log('Part 2: ' + part2(input));
});

const part1 = input => {
  return answer(input, 2);
};

const part2 = input => {
  return answer(input, 1000000);
};

const answer = (input, multiplier) => {
  const emptyRows = Array(input.length).fill(true);
  const emptyCols = Array(input[0].length).fill(true);
  input.forEach((line, row) => {
    line = line.split('');
    line.forEach((char, col) => {
      if (char == '#') {
        emptyRows[row] = false;
        emptyCols[col] = false;
      }
    });
  });
  [emptyRows, emptyCols].forEach(list =>
    list.forEach((val, rowPos) => {
      if (!val) list[rowPos] = list[rowPos - 1] ?? 0;
      else list[rowPos] = (list[rowPos - 1] ?? 0) + multiplier - 1;
    })
  );
  const galaxies = [];
  input.forEach((line, row) => {
    line = line.split('');
    line.forEach((char, col) => {
      if (char == '#') {
        galaxies.push({
          x: row + emptyRows[row],
          y: col + emptyCols[col]
        });
      }
    });
  });
  return galaxies
    .slice(0, -1)
    .flatMap((node1, idx) =>
      galaxies
        .slice(idx + 1)
        .map(node2 => Math.abs(node2.x - node1.x) + Math.abs(node2.y - node1.y))
    )
    .reduce((a, b) => a + b);
};
