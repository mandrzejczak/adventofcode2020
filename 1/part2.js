const fs = require('fs');

// const example = ['1721', '299', '979', '366', '675', '1456']; // res: 241861950

fs.readFile('./input.txt', 'utf8', function (err, data) {
  const stringArray = data.split('\n');
  let resultNumbers;

  for (let i = 0; i < stringArray.length && !resultNumbers; i++) {
    const firstNumber = parseInt(stringArray[i]);

    for (let j = i + 1; j < stringArray.length && !resultNumbers; j++) {
      const secondNumber = parseInt(stringArray[j]);
      const searchedValue = 2020 - firstNumber - secondNumber;
      const searchedValueIdx = stringArray.indexOf(searchedValue.toString(), j + 1);

      if (searchedValueIdx > -1) {
        resultNumbers = [firstNumber, secondNumber, searchedValue];
      }
    }
  };

  const result = resultNumbers[0] * resultNumbers[1] * resultNumbers[2];
  console.log('result: ', result);
});
