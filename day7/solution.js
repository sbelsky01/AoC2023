const cardOrder = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const fs = require("fs");
const filePath = "input.txt";
// const filePath = "testInput.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  const input = data.split(/\n/);
  console.time("PART 1");

  console.log("Part 1: " + part1(input));
  console.log("Part 2: " + part2(input));

  console.timeEnd("PART 1");
});

const part1 = (input) => {
  const bids = input
    .map((line) => {
      const [cards, bid] = line.split(" ");
      return new Hand(cards, +bid);
    })
    .sort((a, b) => a.compareTo(b))
    .map((hand, rank) => {
      // console.log(
      //   hand.cards + " " + hand.type + " " + rank + " " + (rank + 1) * hand.bid
      // );
      return (rank + 1) * hand.bid;
    });
  let sum = 0;
  for (const bid of bids) {
    sum += bid;
  }
  return sum;
};

const part2 = (input) => {
  return;
};

class Hand {
  constructor(cards, bid) {
    this.cards = cards;
    this.type = this._getType(this.cards);
    this.bid = bid;
  }
  _getType(cards) {
    cards = cards.split("").sort().join("");
    if (/(.)\1{4}/.test(cards)) return 7;
    if (/(.)\1{3}/.test(cards)) return 6;
    if (/(.)\1{2}(.)\2{1}/.test(cards) || /(.)\1{1}(.)\2{2}/.test(cards))
      return 5;
    if (/(.)\1{2}/.test(cards)) return 4;
    if (/(.)\1{1}(.)\2{1}/.test(cards)) return 3;
    if (/(.)\1{1}/.test(cards)) return 2;
    return 1;
  }
  _compareCardsString(otherString) {
    for (let i = 0; i < this.cards.length; i++) {
      const comparison =
        cardOrder.indexOf(this.cards[i]) - cardOrder.indexOf(otherString[i]);
      if (comparison !== 0) return comparison;
    }
    return 0;
  }
  compareTo(otherHand) {
    if (this.type < otherHand.type) return -1;
    if (this.type > otherHand.type) return 1;
    return this._compareCardsString(otherHand.cards);
  }
}
