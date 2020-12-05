const fs = require('fs');

// const exampleFile = './example.txt';
// const invalidFile = './invalidExample.txt'; // 0
// const validFile = './validExample.txt'; // 4
const file = './input.txt';

const checkBetween = (number, min, max) => number >= min && number <= max;

// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
const checkHeight = height => {
  if (!(/^\d+(cm|in){1}$/.test(height))) {
    return false
  }

  if (height.indexOf('cm') > -1) {
    return checkBetween(parseInt(height.replace('cm', '')), 150, 193);
  } else {
    return checkBetween(parseInt(height.replace('in', '')), 59, 76);
  }
};

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
const checkHair = hair => {
  return /^#[0-9a-f]{6}$/.test(hair);
};

// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
const checkEyes = eyes => {
  return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(eyes);
};

// pid (Passport ID) - a nine-digit number, including leading zeroes.
const checkPid = pid => {
  return /^\d{9}$/.test(pid);
};

const isPassportValid = item => {
  const pass = item.split(/[\s]/).reduce((obj, item) => {
    const keyValueArray = item.split(':');
    return {
      ...obj,
      [keyValueArray[0]]: keyValueArray[1],
    };
  }, {});

  if (
    (pass.byr && checkBetween(parseInt(pass.byr), 1920, 2002)) &&
    (pass.iyr && checkBetween(parseInt(pass.iyr), 2010, 2020)) &&
    (pass.eyr && checkBetween(parseInt(pass.eyr), 2020, 2030)) &&
    (pass.hgt && checkHeight(pass.hgt)) &&
    (pass.hcl && checkHair(pass.hcl)) &&
    (pass.ecl && checkEyes(pass.ecl)) &&
    (pass.pid && checkPid(pass.pid))
  ) {
    return 1;
  }

  return 0;
};

fs.readFile(file, 'utf8', function (err, data) {
  const stringArray = data.trim().split(/\n\n/);

  const result = stringArray.reduce((acc, item) => {
    return acc += isPassportValid(item);
  }, 0);

  console.log('result: ', result);
});
