const fs = require('fs');

// const exampleFile = './example.txt'; // 336
const file = './input.txt';

const getSlopeTrees = (stringArray, tobogganMoves) => {
  let result = 0;

  for (
    let tobogganPosition = [...tobogganMoves];
    tobogganPosition[0] < stringArray.length;
    tobogganPosition[0] += tobogganMoves[0]
  ) {
    const row = stringArray[tobogganPosition[0]];
    const field = row.charAt(tobogganPosition[1]);

    if (field === "#") {
      result++;
    }

    tobogganPosition[1] = (tobogganPosition[1] + tobogganMoves[1]) % row.length;
  };

  return result;
};


fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.split(/\n/);
  if (!stringArray[stringArray.length]) {
    stringArray.pop();
  }

  const possibleMoves = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ];

  let result = 1;

  possibleMoves.forEach(move => {
    result *= getSlopeTrees(stringArray, move);
  });

  console.log('result: ', result);
});
