const fs = require('fs');

const exampleFile = './example.txt'; // 357, 567, 119, 820
const file = './input.txt';

const getSeat = (num, seatsQuantity) => {
  let seatsRange = [0, seatsQuantity - 1] ;

  for (let i = 0; i < num.length; i++) {
    const middle = (seatsRange[1] - seatsRange[0] + 1) / 2;

    if (num.charAt(i) === 'F' || num.charAt(i) === 'L') {
      seatsRange[1] -= middle;
    } else {
      seatsRange[0] += middle;
    }
  }

  return seatsRange[0];
};

fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.trim().split(/\n/);

  let result = 0;

  stringArray.forEach(code => {
    const row = getSeat(code.substring(0, 7), 128);
    const column = getSeat(code.substring(7, 10), 8);
    const seatId = row * 8 + column;

    if (seatId > result) {
      result = seatId;
    }
  });

  console.log('result: ', result);
});
