const fs = require('fs');

// const exampleFile = './example.txt'; // 7
const file = './input.txt';

const neededParams = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  // 'cid',
];

const isPassportValid = item => {
  const numberOfParams = neededParams.reduce((acc, param) => {
    return acc + (item.indexOf(param) > -1 ? 1 : 0);
  }, 0);

  return numberOfParams === neededParams.length ? 1 : 0;
};

fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.trim().split(/\n\n/);

  const result = stringArray.reduce((acc, item) => {
    return acc += isPassportValid(item);
  }, 0);

  console.log('result: ', result);
});
