const fs = require('fs');

// const example = ['1721', '299', '979', '366', '675', '1456']; // res: 514579

fs.readFile('./input.txt', 'utf8', function (err, data) {
  const stringArray = data.split('\n');
  let resultNumbers;

  for (let i = 0; i < stringArray.length && !resultNumbers; i++) {
    const firstNumber = parseInt(stringArray[i]);
    const searchedValue = 2020 - firstNumber;
    const searchedValueIdx = stringArray.indexOf(searchedValue.toString(), i + 1);

    if (searchedValueIdx > -1) {
      resultNumbers = [firstNumber, searchedValue];
    }
  };

  const result = resultNumbers[0] * resultNumbers[1];
  console.log('result: ', result);
});
