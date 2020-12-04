const fs = require('fs');

// const exampleFile = './example.txt'; // 7
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

  const result = getSlopeTrees(stringArray, [1, 3]);

  console.log('result: ', result);
});
