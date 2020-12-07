const fs = require('fs');

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

  const seats = [];
  let result;

  stringArray.forEach(code => {
    const row = getSeat(code.substring(0, 7), 128);
    const column = getSeat(code.substring(7, 10), 8);
    const seatId = row * 8 + column;

    seats.push(seatId);
  });

  const sortedSeats = seats.sort((a, b) => a - b);

  for (let i = 0; i < sortedSeats.length - 1; i++) {
    if (sortedSeats[i] + 2 === sortedSeats[i + 1]) {
      result = sortedSeats[i] + 1;
      break;
    }
  }

  console.log('result: ', result);
});
